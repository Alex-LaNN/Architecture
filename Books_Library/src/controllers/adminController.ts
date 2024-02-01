import { Request, Response } from "express";
import { SqlQuery } from "../database/migrations/databaseQueries.js";
import { dbConnection } from "../database/migrations/dataBase.js";
import { getViewPath, limitBooksToDisplay } from "../utils/params.js";
import getSecureString from "../utils/utils.js";
import { Book } from "../models/book.js";
import { config } from "../modules/config.js";
import * as Types from "../database/migrations/databaseQueries.js";

// Генерация админ. страницы.
export async function getAdminPage(req: Request, res: Response) {
  // Получение значения количества книг в отображаемой группе на админ. странице.
  const adminLimitBooks: number =
    limitBooksToDisplay < 20 ? limitBooksToDisplay : 5;
  // Значение id книги, с которой начинается отображение группы книг.
  const offset: number =
    +(req.query.page || 1) * adminLimitBooks - adminLimitBooks;

  try {
    // Получение списка книг из базы данных.
    const books: Book[] = (
      await dbConnection.query<Book[]>(SqlQuery.getBooksByPage, [
        offset,
        adminLimitBooks,
      ])
    )[0];

    // Получение значения общего количества книг, находящихся в БД.
    const booksLength: number = (
      await dbConnection.query<Book[]>(SqlQuery.getAllBooks)
    )[0].length;

    // Нужно ли отображать следующую книгу на данной странице.
    const nextBooks: boolean = books.length > adminLimitBooks;
    // Получение значения количества страниц, необходимых для отображения всех книг.
    const totalPages: number = Math.ceil(booksLength / adminLimitBooks);

    // Получение адреса отображаемой страницы.
    const path: string = getViewPath("admin-page") + "";

    // Добавление переменных в объект 'res.locals' для передачи данных в представление.
    res.locals = {
      ...res.locals,
      success: req.query.success === "true",
      message: req.query.message || "",
    };

    // Отображаение страницы админа с передачей данных в шаблон.
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

// Добавление новой книги в БД.
export async function addBook(req: Request, res: Response) {
  // Добавление переменных в объект 'res.locals' для передачи данных в представление.
  res.locals = {
    ...res.locals,
    success: req.query.success === "false",
    message: req.query.message || "",
  };

  try {
    // Получение данных о новой книге из тела запроса (из формы добавления новой книги).
    const { name, year, pages, description, ...authorsData } = req.body;
    // Исключение пустых значений в полях ввода авторов для корректного отображения на странице.
    const authors = Object.values(authorsData).filter(
      (author) => author !== ""
    );

    // Дополнительная обработка полученных данных для обеспечения безопасных запросов в БД.
    const checkedData = {
      name: getSecureString(name),
      year: getSecureString(year),
      pages: getSecureString(pages),
      description: getSecureString(description),
      authors: getSecureString(Object.values(authors).join(", ")),
    };

    // Получение сгенерированного имени изображения обложки добавляемой книги.
    const fileName: string = config.fileName;

    // Добавление книги в БД.
    const updateBooksTable = await dbConnection.query(SqlQuery.addNewBook, [
      checkedData.name,
      checkedData.year,
      checkedData.pages,
      checkedData.description,
      checkedData.authors,
      fileName,
    ]);

    //
    if (
      Array.isArray(updateBooksTable) &&
      updateBooksTable[0] &&
      "affectedRows" in updateBooksTable[0] &&
      updateBooksTable[0].affectedRows === 1
    ) {
      // Добавление новых данных в 'book_authors'.
      const newBookId: number = updateBooksTable[0].insertId;
//      console.log(`aC 111: newBookId: ${newBookId}`); ///////////////////////////////////////////
      try {
        await dbConnection.execute(Types.SqlQuery.addNewAuthors, [newBookId]);
//        console.log(`aC 114: Добавление новых данных в 'book_authors'...`); ///////////////////////
      } catch (error) {
        console.error(
          `aC 117: Ошибка при добавлении новых данных в 'book_authors': ${error}`
        );
      }
      // Обновление таблицы 'connections'.
      await dbConnection.execute(Types.SqlQuery.uodateConnections, [newBookId]);
//      console.log(`aC 122: 'connections' обновлена.`); /////////////////////////////////
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

// Удаление книги.
export async function deleteBook(req: Request, res: Response) {
  const id: number = +req.params.id;
  try {
    await dbConnection.execute(SqlQuery.markForDeletion, [id]);
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

// Восстановление книги (отмена удаления в течении ожидания удаления).
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

// Выполнение выхода из системы.
export async function getLogout(req: Request, res: Response) {
  // Получение значения заголовка Authorization.
  const authorization = req.get("Authorization");

  // Удаление 'cookie' с именем 'Authorization'.
  if (authorization) {
    res.cookie("Authorization", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
    });
  }
  // Очищение заголовка 'Authorization' для выхода из аутентификации.
  res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
  // Перенаправление пользователя на главную незащищенную страницу.
  res.redirect("/");
}
