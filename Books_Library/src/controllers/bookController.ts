import { Request, Response } from "express";
import { SqlQuery } from "../database/migrations/databaseQueries.js";
import { dbConnection } from "../database/migrations/dataBase.js";
import { getViewPath } from "../utils/params.js";
import getSecureString from "../utils/stringProcessing.js";
import { Book } from "../models/book.js";

// Поиск книг с использованием поисковой строки.
export async function findBooks(req: Request, res: Response) {
  // Создание необходимых полей в ответе.
  res.locals = {
    ...res.locals,
    success: req.query.success === "false",
    message: req.query.message || "",
  };
  // Получение результатов поиска.
  const value = await getBooks(req, res);
  // Отображение результатов поиска.
  const path = getViewPath("finded-results-page") + "";
  //console.log(`path: ${path}`);
  if (value?.result) {
    const messageString: string = getMessage(value);
    res.render(path, {
      success: true,
      message: messageString,
      books: value.result,
    });
  } else {
    res.json({
      success: false,
      message: `Согласно введенного введенного вами значения не найдено совпадений...`,
    });
  }
}

// Поиск книг по БД.
async function getBooks(req: Request, res: Response) {
  let numberSearchString: number;
  // Получить поисковую строку из запроса.
  const searchString: string = req.query.search as string;
  if (!searchString) {
    // Если не найдено ни одного заданного параметра для поиска => ошибка.
    res.status(400).json({
      error: "No search parameters found.",
    });
  } else {
    // Дополнительная обработка поисковой строки!!!.
    const checkedString = getSecureString(searchString);
    console.log(`49 checkedString: ${checkedString}`);
    // Проверка - является ли 'searchString' числом.
    numberSearchString = Number(checkedString);
    if (Number.isNaN(numberSearchString)) {
      numberSearchString = 0;
    }
    const result = await searchBooks(checkedString, numberSearchString);
    return { result, checkedString, numberSearchString };
  }
}

// Осуществление поиска с выбором соответствующих запросов к БД.
async function searchBooks(searchString: string, numberSearchString: number) {
  // Получить результаты поиска по соответствующему SQL-запросу.
  if (numberSearchString === 0) {
    return (
      await dbConnection.query<Book[]>(SqlQuery.findBooksByNames, [
        searchString,
        searchString,
      ])
    )[0];
  } else {
    return (
      await dbConnection.query<Book[]>(SqlQuery.findBooksByNumber, [
        numberSearchString,
        numberSearchString,
      ])
    )[0];
  }
}

// Генерация отображаемого сообщения о полученных результатах.
function getMessage(value: any): string {
  const count = value.result.length;
  const param = value.numberSearchString
    ? value.numberSearchString
    : value.checkedString;
  const ending: string = count === 1 ? "е" : count > 1 && count < 5 ? "я" : "й";
  return `Согласно вашего введенного значения: '${param}...', найдено ${count} совпадени${ending} :`;
}
