import mysql, { RowDataPacket } from "mysql2";
import * as Types from "./databaseQueries.js";
import { readFileSync } from "fs";

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

  // const addition = {
  //   books: insertDataIntoTable("books"),
  //   authors: insertDataIntoTable("book_authors"),
  //   connections: insertDataIntoTable("connections"),
  // };

  // // Итератор для перебора Promise-объектов.
  // const iterator = Object.values(addition).entries();

  // // Перебор Promise-объектов.
  // for await (const [key, value] of iterator) {
  //   await value;
  // }
}

// Удаление БД.
async function deleteTables() {
  const queries = [
    Types.SqlQuery.deleteBooksTable,
    Types.SqlQuery.deleteConnectionsTable,
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
      // dataForTable = Types.SqlQuery.fillTheAuthorsTable;
      dataForTable = readFileSync(`./src/database/book_authors.sql`).toString();
      break;
    case "connections":
      createTable = Types.SqlQuery.createConnectionsTable;
      // dataForTable = Types.SqlQuery.fillTheConnectionsTable;
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
