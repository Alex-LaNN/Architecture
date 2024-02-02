import { Request, Response } from "express";
import { SqlQuery } from "../database/migrations/databaseQueries.js";
import { dbConnection } from "../database/migrations/dataBase.js";
import { limitBooksToDisplay } from "../utils/params.js";
import { Book } from "../models/book.js";
import { getViewPath } from "../utils/utils.js";

// Getting a book page.
export async function getBookPage(req: Request, res: Response) {
  // Getting the 'id' of a book from the request parameters and converting it to a number.
  const id: number = +req.params.id;
  try {
    // Increasing the counter for the number of book views.
    await dbConnection.execute(SqlQuery.updateBookViewsById, [id]);
    // Retrieving book data by its 'id' from the database.
    const book: Book = (
      await dbConnection.query<Book[]>(SqlQuery.getBookById, [id])
    )[0][0];
    // Getting the path to the book page template.
    const path = getViewPath("book-page") + "";
    // If a book is found, its page is displayed.
    if (book) res.render(path, { book });
  } catch (error) {
    res.status(500).send({ error: `No book were found for this search.` });
  }
}

// Getting a page with all books.
export async function getAllBooksPage(req: Request, res: Response) {
  // Retrieving a search string from a query and converting it to a string.
  let searchString: string = req.query.search + "";
  // Getting the offset from the request and converting it to a number.
  const offset: number = +(req.query.offset || 0);
  // Determining the presence of a previous page with books.
  const previous: boolean = offset > 0;

  try {
    // Getting a list of books from the database.
    let books: Book[] = (
      await dbConnection.query<Book[]>(SqlQuery.getAllBooks)
    )[0];
    // Calculation of the total number of pages.
    const pages: number = Math.ceil(books.length / limitBooksToDisplay);
    // Determining the number of books on the current page.
    const countBooksOnPage: number = limitBooksToDisplay + offset;
    // Determining whether there is a next page of books to display.
    const nextBooks: boolean = books.length > countBooksOnPage;

    // Getting a list of books for the current page.
    books = books.slice(0, countBooksOnPage);
    // Getting the path to the page template with the books displayed.
    const path: string = getViewPath("books-page") + "";

    // Displaying a page with all books with data transfer to the template.
    res.render(path, {
      books,
      pages,
      previous,
      nextBooks,
      offset,
      search: searchString,
    });
  } catch (error) {
    res.status(500).send({ error: `No books to display.` });
  }
}

// Increase in book clicks.
export async function incrementWantCount(req: Request, res: Response) {
  const id: number = +req.params.id;
  // Checking that id is a real number.
  if (isNaN(id)) {
    return res.status(400).json({ status: false, error: "Invalid book id" });
  }
  await dbConnection.execute(SqlQuery.incrementWantedById, [id]);
  res.json({ status: true });
}
