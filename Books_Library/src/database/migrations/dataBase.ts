import mysql, { RowDataPacket } from "mysql2";
import * as Types from "./databaseQueries.js";
import { readFileSync, unlink, writeFileSync } from "fs";
import mysqldump from "mysqldump";
import { sqlConnectionConfig, unsafeRequests } from "../../modules/dotenv.js";
import { getBasePath, getCurrentTime, getTime } from "../../utils/utils.js";
import path from "path";

// Create a pool of database connections.
export const dbConnection = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: String(process.env.DB_USER),
    port: Number(process.env.DB_PORT),
    password: String(process.env.DB_PASS),
    database: String(process.env.DB_NAME),
    multipleStatements: true,
  })
  .promise();

// Database initialization.
export async function initializeDB() {
  // Availability check...
  const tablesExist = await Promise.all([
    dbConnection.query<RowDataPacket[]>(Types.SqlQuery.checkBooksTable),
    dbConnection.query<RowDataPacket[]>(Types.SqlQuery.checkAuthorsTable),
    dbConnection.query<RowDataPacket[]>(Types.SqlQuery.checkConnectionsTable),
  ]);
  // Checking for missing table.
  const anyTableMissing = tablesExist.some(
    ([table]) => !table || table.length === 0
  );
  // Creating a database.
  if (anyTableMissing) {
    await deleteTables();
    insertData();
  }
}

// Creating and filling tables.
async function insertData() {
  await insertDataIntoTables("books");
  await insertDataIntoTables("book_authors");
  await insertDataIntoTables("connections");
}

// Deleting a database.
export async function deleteTables() {
  const queries = [
    Types.SqlQuery.deleteConnectionsTable,
    Types.SqlQuery.deleteBooksTable,
    Types.SqlQuery.deleteAuthorsTable,
  ];
  for (const query of queries) {
    await dbConnection.execute(query);
  }
}

// Creating and filling tables.
async function insertDataIntoTables(tableName: string) {
  let dataForTable: string;
  let createTable: string;
  switch (tableName) {
    case "books":
      createTable = Types.SqlQuery.createBooksTable;
      dataForTable = readFileSync(`./src/database/books.sql`).toString();
      break;
    case "book_authors":
      createTable = Types.SqlQuery.createAuthorsTable;
      dataForTable = readFileSync(`./src/database/book_authors.sql`).toString();
      break;
    case "connections":
      createTable = Types.SqlQuery.createConnectionsTable;
      dataForTable = readFileSync(`./src/database/connections.sql`).toString();
      break;
    default:
      throw new Error(`Unsupported table name: ${tableName}`);
  }
  try {
    await dbConnection.execute(createTable);
    await dbConnection.execute(dataForTable);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Creating a database backup.
export async function getDataBaseDump() {
  // Formation of the backup file name.
  const newDumpName: string = getTime() + "_dump.sql";
  // Recording the file name of the latest database dump.
  writeFileSync("src/database/dumps/lastDump.txt", newDumpName);
  // Getting the full path to the backup file.
  const pathToNewFile: string = path.join(
    getBasePath(),
    "src",
    "database",
    "dumps",
    newDumpName
  );
  // Performing a database backup using 'mysqldump'.
  mysqldump({
    connection: sqlConnectionConfig,
    dumpToFile: pathToNewFile,
  })
    .then(() =>
      console.log(
        `dB 109: The database dump was completed successfully at ${getCurrentTime()}`
      )
    )
    .catch((error) =>
      console.log(`dB 113: Error while dumping database: ${error}`)
    );
}

// Removing books from the database that are marked as 'removable'.
export async function removeMarkedBooks() {
  try {
    // Getting a list of marked books.
    const bookIdsForDelete = (
      await dbConnection.query<RowDataPacket[]>(
        Types.SqlQuery.getBookIdsMurkedForDeletion
      )
    )[0].map((obj: RowDataPacket) => obj.id);

    // The list of 'books to delete' is not empty.
    if (bookIdsForDelete && bookIdsForDelete.length > 0) {
      // Deleting each book marked as 'to be deleted'.
      for (const bookId of bookIdsForDelete) {
        try {
          // Deleting a book and all its connections.
          await removeBook(bookId);
        } catch (error) {
          console.log(
            `dB 136: Ошибка удаления книги с id = ${bookId}: ${error}`
          );
        }
      }
    }
  } catch (error) {
    console.error("dB 142: Error removing marked books:", error);
  }

  // Deleting a book and all its connections.
  async function removeBook(bookId: number) {
    try {
      // Getting the time value at which the workbook should be deleted.
      const requestData: any = (
        await dbConnection.query(Types.SqlQuery.getRemovalTimeById, [bookId])
      )[0];
      const removalTime = requestData[0].removal_time;
      // Book deletion flag.
      const forRemoval: boolean = removalTime < getTime();
      // Deleting a book and all its connections.
      if (forRemoval) {
        // Removing a book cover.
        await deleteBookImage(bookId);
        // Deleting the book itself.
        await dbConnection.execute(Types.SqlQuery.deleteBookById, [bookId]);
        // Removing data from the 'book_authors' table associated with the deleted book.
        await deleteAuthorsAfterDeleteBook();
        console.log(`dB 163: Book with id: ${bookId} has been deleted.`);
      }
    } catch (error) {
      console.error(`dB 166: Error removing book with id: ${bookId}.`, error);
    }
  }

  // Removing the book image.
  async function deleteBookImage(bookId: number) {
    try {
      // Getting the image name from the database.
      const requestData: any = (
        await dbConnection.query(Types.SqlQuery.getImageNameById, [bookId])
      )[0];
      const imageName = requestData[0].image;
      // Formation of the path to the image file.
      const pathToDeleteImage: string = path.join(
        getBasePath(),
        "src",
        "views",
        "images",
        imageName + ".jpg"
      );
      // Deleting an image file.
      unlink(pathToDeleteImage, (error) => {
        if (error) {
          console.error(`dB 189: Ошибка удаления изображения: ${error}`);
        }
      });
    } catch (error) {
      console.error(
        `dB 194: Ошибка, при получении имени изображения книги ${bookId}.`
      );
    }
  }

  // Removing data from the 'book_authors' table.
  async function deleteAuthorsAfterDeleteBook() {
    try {
      // Execute a request to delete data.
      await dbConnection.execute(Types.SqlQuery.removeUnusedAuthorsByID);
    } catch (error: any) {
      console.error(
        "dB 206: Error when executing a request to delete data from the database:",
        error
      );
      // Repeated unsafe(!) attempt to delete data from the database.
      await getRepeatRequest();
    }
  }

  // Repeated attempt to delete data from the database.
  async function getRepeatRequest() {
    // Forcing data deletion in an unsafe way(!).
    try {
      // Disable 'safe update mode'(!).
      const disableProtection: string = unsafeRequests.safeOff!;
      await dbConnection.query(disableProtection);
      // Performing deletion.
      await dbConnection.execute(Types.SqlQuery.removeUnusedAuthorsByID);
      console.log(
        `Удаление данных выполнено небезопасным способом в ${getCurrentTime()}.`
      );
    } catch (error) {
      console.error("Error while retrying main request:", error);
    } finally {
      // Mandatory inclusion of 'safe update mode'(!).
      const enableProtection: string = unsafeRequests.safeOn!;
      await dbConnection.execute(enableProtection);
      console.log(`'safe update mode' включено.`);
    }
  }
}

// Database update.
export async function updateDB() {
  try {
    // Getting the path to the file with the backup name.
    const pathToLastDump: string = path.join(
      getBasePath(),
      "src",
      "database",
      "dumps",
      "lastDump.txt"
    );
    // Reading the backup name from a file.
    const fileNameForUpdateDB = readFileSync(pathToLastDump, "utf-8");

    // Obtaining the path to the file with requests for updating the database.
    const updateDBPath = path.join(
      getBasePath(),
      "src",
      "database",
      "dumps",
      fileNameForUpdateDB
    );
    // Reading SQL queries from a file.
    const updateDBSql = readFileSync(updateDBPath, "utf8");

    // Removing all tables from the database.
    await deleteTables();

    // Database update.
    await dbConnection.query(updateDBSql);
    console.log(`БД обновлена в ${getCurrentTime()}.`);
  } catch (error) {
    console.error("Ошибка, при обновлении БД:", error);
  }
}
