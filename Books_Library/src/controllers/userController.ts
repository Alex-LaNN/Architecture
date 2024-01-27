import { Request, Response, NextFunction } from "express";
import { SqlQuery } from "../database/migrations/databaseQueries.js";
import { dbConnection } from "../database/migrations/dataBase.js";
import { getViewPath, limitBooksToDisplay } from "../utils/params.js";
import { Book } from "../models/book.js";

//
export async function getBookPage(req: Request, res: Response) {
  const id: number = +req.params.id;
  //console.log(`uC.11 - id: ${id}`);
  try {
    await dbConnection.execute(SqlQuery.updateBookViewsById, [id]); // увеличение счетчика количества просмотров книги
    const book: Book = (
      await dbConnection.query<Book[]>(SqlQuery.getBookById, [id])
    )[0][0];
    const path = getViewPath("book-page") + "";
    //console.log(`path: ${path}`);
    if (book) res.render(path, { book });
    //if (book) res.render("./src/views/book/book-page.ejs", { book });
  } catch (error) {
    res.status(500).send({ error: `No book were found for this search.` });
  }
}

//
export async function getAllBooksPage(
  req: Request,
  res: Response
) {
  let searchString: string = req.query.search + ""; //////////////////    обработать строку !!!!!!!!!!!!!!!!!!!!
  const offset: number = +(req.query.offset || 0);
  const previous: boolean = offset > 0;

  try {
    let books: Book[];
    if (searchString) {
      books = (
        await dbConnection.query<Book[]>(SqlQuery.getAllBooks, [searchString])
      )[0];
    } else books = (await dbConnection.query<Book[]>(SqlQuery.getAllBooks))[0];

    const pages: number = Math.ceil(books.length / limitBooksToDisplay);
    const countBooksOnPage: number = limitBooksToDisplay + offset;
//    const nextBooks: boolean = books.length > limitBooksToDisplay + offset;
    const nextBooks: boolean = books.length > countBooksOnPage;

    //console.log(nextBooks)
//    books = books.slice(offset, limitBooksToDisplay + offset);
    books = books.slice(0, countBooksOnPage);
    const path: string = getViewPath("books-page") + "";
    //books ? console.log("books заполнен") : console.log("books пустой");

    res.render(path, {
      books,
      pages,
      previous,
      nextBooks,
      offset,
      search: searchString || "",
    });
  } catch (error) {
    res.status(500).send({ error: `No books were found.` });
  }
}

// Увеличение количества кликов книги.
export async function incrementWantCount(req: Request, res: Response) {
  const id: number = +req.params.id;
  await dbConnection.execute(SqlQuery.incrementWantedById, [id]);
  res.json({ status: true });
}
