import mysql, { RowDataPacket } from "mysql2";
import * as Types from "./databaseQueries.js";
import { readFileSync, unlink, writeFileSync } from "fs";
import mysqldump from "mysqldump";
import { sqlConnectionConfig, unsafeRequests } from "../../modules/dotenv.js";
import { getCurrentTime, getTime } from "../../utils/utils.js";
import path from "path";
import { toNumber } from "lodash";

//
const basePath = process.cwd();

// Создание пула соединений с базой данных.
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

// Инициализация БД.
export async function initializeDB() {
  // Проверка наличия...
  const tablesExist = await Promise.all([
    dbConnection.query<RowDataPacket[]>(Types.SqlQuery.checkBooksTable),
    dbConnection.query<RowDataPacket[]>(Types.SqlQuery.checkAuthorsTable),
    dbConnection.query<RowDataPacket[]>(Types.SqlQuery.checkConnectionsTable),
  ]);
  // Проверка отсутствия таблицы.
  const anyTableMissing = tablesExist.some(
    ([table]) => !table || table.length === 0
  );
  // Создание БД.
  if (anyTableMissing) {
    await deleteTables();
    insertData();
  }
}

// Создание и заполнение таблиц.
async function insertData() {
  await insertDataIntoTables("books");
  await insertDataIntoTables("book_authors");
  await insertDataIntoTables("connections");
}

// Удаление БД.
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

// Ссоздание и заполнение таблиц.
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

// Создание резервной копии БД.
export async function getDataBaseDump() {
  // Формирование имени файла резервной копии.
  const newFileName: string = getTime() + "_dump.sql";
  console.log(`dB 95 newFileName: ${newFileName}`); //////////удалить////////////
  // Запись имени файла для хранения последнего дампа БД.
  writeFileSync("src/database/dumps/lastDump.txt", newFileName);
  // Получение полного пути к файлу резервной копии.
  const pathToNewFile: string = path.join(
    basePath,
    "src",
    "database",
    "dumps",
    newFileName
  );
  // Выполнение резервного копирования БД с помощью 'mysqldump'.
  mysqldump({
    connection: sqlConnectionConfig,
    dumpToFile: pathToNewFile,
  })
    .then(() =>
      console.log(
        `dB 113: The database dump was completed successfully at ${getCurrentTime()}`
      )
    )
    .catch((error) =>
      console.log(`dB 117: Error while dumping database: ${error}`)
    );
}

// Удаление книг из БД, отмеченных удаляемыми.
export async function removeMarkedBooks() {
  try {
    const bookIdsForDelete = (
      await dbConnection.query<RowDataPacket[]>(
        Types.SqlQuery.getBookIdsMurkedForDeletion
      )
    )[0].map((obj: RowDataPacket) => obj.id);

    // Полное удаление всех данных, связанных с удаляемой книгой.
    if (bookIdsForDelete && bookIdsForDelete.length > 0) {
      // Удаление каждой книги, отмеченной как 'удаляемая'.
      for (const bookId of bookIdsForDelete) {
        try {
          await deleteBookImage(bookId);
          await dbConnection.execute(Types.SqlQuery.deleteBookById, [bookId]);
          // Удаление данных из таблицы 'book_authors'.
          await deleteAuthorsAfterDeleteBook();
          console.log(`dB 141: Book with id ${bookId} has been deleted.`);
        } catch (error) {
          console.log(
            `dB 144: Ошибка удаления книги с id = ${bookId}: ${error}`
          );
        }
      }
    } else {
      console.log(`dB 148: No books marked for deletion.`);
    }
  } catch (error) {
    console.error("dB 151: Error removing marked books:", error);
  }

  // 
  async function deleteBookImage(bookId: any) {
    try {
      console.log(`dB 157: bookId: ${typeof (bookId)} - ${bookId}`);//////////////
      const requestData: any = (
        await dbConnection.query(Types.SqlQuery.getImageNameById, [bookId])
      )[0];
      const imageName = requestData[0].image;
      const pathToDeleteImage: string = path.join(
        basePath,
        "src",
        "views",
        "images",
        imageName + ".jpg"
      );
      unlink(pathToDeleteImage, (error) => {
        if (error) {
          console.error(
            `Ошибка удаления изображения: ${error}`
          );
        }
      });
    } catch (error) {
      console.error(
        `dB 185: Ошибка, при удалении изображения книги ${bookId}.`
      );
    }
  }

  // Удаление данных из таблицы 'book_authors'.
  async function deleteAuthorsAfterDeleteBook() {
    try {
      // Попытка выполнить запрос на удаление данных.
      await dbConnection.execute(Types.SqlQuery.removeUnusedAuthorsByID);
      console.log(
        `dB 196: Удаление данных выполнено штатно в ${getCurrentTime()}.`
      );
    } catch (error: any) {
      console.error(
        "dB 200: Error when executing a request to delete data from the database:",
        error
      );
      // Повторная небезопасная попытка удаления данных из БД !
      await getRepeatRequest();
    }
  }

  // Повторная попытка удаления данных из БД.
  async function getRepeatRequest() {
    // Принудительное выполнение удаления данных небезопасным способом!!!
    try {
      // Отключение 'safe update mode'.
      const disableProtection: string = unsafeRequests.safeOff!;
      await dbConnection.query(disableProtection);
      // Повторное выполнение запроса.
      await dbConnection.execute(Types.SqlQuery.removeUnusedAuthorsByID);
      console.log(
        `Удаление данных выполнено небезопасным способом в ${getCurrentTime()}.`
      );
    } catch (error) {
      console.error("Error while retrying main request:", error);
    } finally {
      // Обязательное включение 'safe update mode'.
      const enableProtection: string = unsafeRequests.safeOn!;
      await dbConnection.execute(enableProtection);
      console.log(`'safe update mode' включено.`);
    }
  }
}

// Обновление базы данных.
export async function updateDB() {
  try {
    // Получение пути к файлу с именем резервной копии.
    const pathToLastDump: string = path.join(
      basePath,
      "src",
      "database",
      "dumps",
      "lastDump.txt"
    );
    // Чтение имени резервной копии из файла.
    const fileNameForUpdateDB = readFileSync(pathToLastDump, "utf-8");
    //    console.log(`dB 205 fileNameForUpdateDB: ${fileNameForUpdateDB}`); //////////////////

    // Получение пути к файлу с SQL-запросами для обновления БД.
    const updateDBPath = path.join(
      basePath,
      "src",
      "database",
      "dumps",
      fileNameForUpdateDB
    );
    // Чтение SQL-запросов из файла.
    const updateDBSql = readFileSync(updateDBPath, "utf8");

    // Удаление всех таблиц из БД.
    await deleteTables();

    // Выполнение SQL-запросов для обновления БД.
    await dbConnection.query(updateDBSql);
    console.log(`БД обновлена в ${getCurrentTime()}.`);
  } catch (error) {
    console.error("Ошибка, при обновлении БД:", error);
  }
}
