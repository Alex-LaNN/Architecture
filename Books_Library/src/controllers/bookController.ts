import { Request, Response } from "express";
import { SqlQuery } from "../database/migrations/databaseQueries.js";
import { dbConnection } from "../database/migrations/dataBase.js";
import getSecureString, { getViewPath } from "../utils/utils.js";
import { Book } from "../models/book.js";

// Search for books using the search bar.
export async function findBooks(req: Request, res: Response) {
  // Creating the required fields in the response.
  res.locals = {
    ...res.locals,
    success: req.query.success === "false",
    message: req.query.message || "",
  };
  // Getting search results.
  const value = await getBooks(req, res);
  // Display search results.
  const path = getViewPath("finded-results-page") + "";
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

// Search for books by database.
async function getBooks(req: Request, res: Response) {
  let numberSearchString: number;
  // Get the search string from the query.
  const searchString: string = req.query.search as string;
  if (!searchString) {
    // If no specified search parameters are found => error.
    res.status(400).json({
      error: "No search parameters found.",
    });
  } else {
    // Additional processing of the search string!!!.
    const checkedString = getSecureString(searchString);
    // Checking whether 'searchString' is a number.
    numberSearchString = Number(checkedString) || 0;
    const result = await searchBooks(checkedString, numberSearchString);
    return { result, checkedString, numberSearchString };
  }
}

// Carrying out a search with the selection of appropriate queries to the database.
async function searchBooks(
  searchString: string,
  numberSearchString: number
): Promise<Book[]> {
  // Get search results for the corresponding SQL query.
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

// Generating a message about the search results obtained.
function getMessage(value: any): string {
  const count = value.result.length;
  const param = value.numberSearchString
    ? value.numberSearchString
    : value.checkedString;
  const ending: string = count === 1 ? "е" : count > 1 && count < 5 ? "я" : "й";
  return `Согласно вашего введенного значения: '${param}...', найдено ${count} совпадени${ending} :`;
}
