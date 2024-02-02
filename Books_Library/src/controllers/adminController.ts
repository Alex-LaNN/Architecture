import { Request, Response } from "express";
import { SqlQuery } from "../database/migrations/databaseQueries.js";
import { dbConnection } from "../database/migrations/dataBase.js";
import { limitBooksToDisplay } from "../utils/params.js";
import getSecureString, { getTime, getViewPath } from "../utils/utils.js";
import { Book } from "../models/book.js";
import { config } from "../modules/config.js";
import * as Types from "../database/migrations/databaseQueries.js";

// Generating the admin page.
export async function getAdminPage(req: Request, res: Response) {
  // Getting the number of books in the displayed group on the admin. page.
  const adminLimitBooks: number =
    limitBooksToDisplay < 20 ? limitBooksToDisplay : 5;
  // The id value of the book from which the book group display begins.
  const offset: number =
    +(req.query.page || 1) * adminLimitBooks - adminLimitBooks;

  try {
    // Getting a list of books from the database.
    const books: Book[] = (
      await dbConnection.query<Book[]>(SqlQuery.getBooksByPage, [
        offset,
        adminLimitBooks,
      ])
    )[0];

    // Getting the total number of books in the database.
    const booksLength: number = (
      await dbConnection.query<Book[]>(SqlQuery.getAllBooks)
    )[0].length;

    // Whether the next book will be displayed on this page.
    const nextBooks: boolean = books.length > adminLimitBooks;
    // Gets the number of pages required to display all books.
    const totalPages: number = Math.ceil(booksLength / adminLimitBooks);

    // Getting the address of the displayed page.
    const path: string = getViewPath("admin-page") + "";

    // Add variables to the 'res.locals' object to pass data to the view.
    res.locals = {
      ...res.locals,
      success: req.query.success === "true",
      message: req.query.message || "",
    };

    // Displaying the admin page with data transfer to the template.
    res.render(path, {
      books,
      booksLength,
      adminLimitBooks,
      previous: offset > 0,
      nextBooks,
      totalPages,
      currentPage: +(req.query.page || 1),
    });
  } catch (error) {
    res.status(500).send({ error: `${error}` });
  }
}

// Add a new book to the database.
export async function addBook(req: Request, res: Response) {
  // Add variables to the 'res.locals' object to pass data to the view.
  res.locals = {
    ...res.locals,
    success: req.query.success === "false",
    message: req.query.message || "",
  };

  try {
    // Receiving data about a new book from the request body (from the form for adding a new book).
    const { name, year, pages, description, ...authorsData } = req.body;
    // Excluding empty values in author input fields for correct display on the page.
    const authors = Object.values(authorsData).filter(
      (author) => author !== ""
    );

    // Additional processing of received data to ensure secure queries in the database.
    const checkedData = {
      name: getSecureString(name),
      year: getSecureString(year),
      pages: getSecureString(pages),
      description: getSecureString(description),
      authors: getSecureString(Object.values(authors).join(", ")),
    };

    // Get the generated image name for the book being added.
    const fileName: string = config.fileName;

    // Add a book to the database.
    const updateBooksTable = await dbConnection.query(SqlQuery.addNewBook, [
      checkedData.name,
      checkedData.year,
      checkedData.pages,
      checkedData.description,
      checkedData.authors,
      fileName,
    ]);

    // Successful update of a row in the books table.
    if (
      Array.isArray(updateBooksTable) &&
      updateBooksTable[0] &&
      "affectedRows" in updateBooksTable[0] &&
      updateBooksTable[0].affectedRows === 1
    ) {
      // Adding new data to 'book_authors'.
      const newBookId: number = updateBooksTable[0].insertId;
      try {
        await dbConnection.execute(Types.SqlQuery.addNewAuthors, [newBookId]);
      } catch (error) {
        console.error(
          `aC 115: Ошибка при добавлении новых данных в 'book_authors': ${error}`
        );
      }
      // Update table 'connections'.
      await dbConnection.execute(Types.SqlQuery.uodateConnections, [newBookId]);
      res.json({
        success: true,
        message: "Книга добавлена успешно.",
      });
    } else {
      res.status(500).send({
        message: "Ошибка при сохранении файла.",
        error: "Ошибка сохранения файла",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: `${error}`,
      success: false,
      message: "Error adding a new book! The database may be incorrect.",
    });
  }
}

// Marking a book for removal.
export async function markForDeleteBook(req: Request, res: Response) {
  const id: number = +req.params.id;
  try {
    // The time after which the book will be deleted.
    //    const timeToDelete: number = getTime() + 24 * 60 * 60 * 1000; // 1 день по условию...
    const timeToDelete: number = getTime() + 300000; // 5 минут
    await dbConnection.execute(SqlQuery.markForDeletion, [timeToDelete, id]);
    res.send({
      success: true,
      message:
        "Книга отмечена как 'удаляемая'. Окончательно она будет удалена через 24часа.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Ошибка при удалении книги из БД.",
      error: `${error}`,
    });
  }
}

// Book restoration (cancel deletion while waiting for deletion).
export async function recoverBook(req: Request, res: Response) {
  const id: number = +req.params.id;
  try {
    await dbConnection.execute(SqlQuery.markForRecover, [id]);
    res.send({
      success: true,
      message: "Книга восстановлена успешно.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Ошибка при восстановлении книги в БД.",
      error: `${error}`,
    });
  }
}

// Execute a logout.
export async function getLogout(req: Request, res: Response) {
  // Getting the value of the 'Authorization' header.
  const authorization = req.get("Authorization");

  // Removing 'cookie' named 'Authorization'.
  if (authorization) {
    res.cookie("Authorization", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
    });
  }
  // Clear the 'Authorization' header to exit authentication.
  res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
  // Redirecting the user to the main unsecured page.
  res.redirect("/");
}
