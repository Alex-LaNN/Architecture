import { Request, Response } from "express";
import { SqlQuery } from "../database/migrations/databaseQueries.js";
import { dbConnection } from "../database/migrations/dataBase.js";
import { limitBooksToDisplay } from "../utils/params.js";
import { Book } from "../models/book.js";
import { getViewPath } from "../utils/utils.js";

// Получение страницы книги.
export async function getBookPage(req: Request, res: Response) {
  // Получение 'id' книги из параметров запроса с преобразованием его в число.
  const id: number = +req.params.id;
  try {
    // Увеличение счетчика количества просмотров книги.
    await dbConnection.execute(SqlQuery.updateBookViewsById, [id]);
    // Получение данные книги по ее 'id' из базы данных.
    const book: Book = (
      await dbConnection.query<Book[]>(SqlQuery.getBookById, [id])
    )[0][0];
    // Получение пути к шаблону страницы книги.
    const path = getViewPath("book-page") + "";
    // Если книга найдена, отображение ее страницы.
    if (book) res.render(path, { book });
  } catch (error) {
    res.status(500).send({ error: `No book were found for this search.` });
  }
}

// Получение страницы со всеми книгами.
export async function getAllBooksPage(req: Request, res: Response) {
  // Получение строки поиска из запроса с преобразованием ее в строку.
  let searchString: string = req.query.search + "";
  // Получение смещения (offset) из запроса с преобразованием его в число.
  const offset: number = +(req.query.offset || 0);
  // Определение наличия предыдущей страницы с книгами.
  const previous: boolean = offset > 0;

  try {
    // Получение списка книг из базы данных.
    let books: Book[] = (
      await dbConnection.query<Book[]>(SqlQuery.getAllBooks)
    )[0];
    // Рассчет общего количества страниц.
    const pages: number = Math.ceil(books.length / limitBooksToDisplay);
    // Определение количества книг на текущей странице.
    const countBooksOnPage: number = limitBooksToDisplay + offset;
    // Определение есть ли следующая страница с книгами для отображения.
    const nextBooks: boolean = books.length > countBooksOnPage;

    // Получение списка книг для текущей страницы.
    books = books.slice(0, countBooksOnPage);
    // Получение пути к шаблону страницы с отображаемыми книгами.
    const path: string = getViewPath("books-page") + "";

    // Отображение страницы со всеми книгами с передачей данных в шаблон.
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

// Увеличение количества кликов книги.
export async function incrementWantCount(req: Request, res: Response) {
  const id: number = +req.params.id;
  // Проверка, что id - это действительное число.
  if (isNaN(id)) {
    return res.status(400).json({ status: false, error: "Invalid book id" });
  }
  await dbConnection.execute(SqlQuery.incrementWantedById, [id]);
  res.json({ status: true });
}
