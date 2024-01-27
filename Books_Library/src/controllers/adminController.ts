import { Request, Response } from "express";
import { SqlQuery } from "../database/migrations/databaseQueries.js";
import { dbConnection } from "../database/migrations/dataBase.js";
import { getViewPath, limitBooksToDisplay } from "../utils/params.js";
import getSecureString from "../utils/stringProcessing.js";
import { Book } from "../models/book.js";
import { config } from "../modules/config.js";

// Генерация админ. страницы.
export async function getAdminPage(req: Request, res: Response) {
  // Получение значения количества книг в отображаемой группе на админ. странице.
  const adminLimitBooks: number =
    limitBooksToDisplay < 20 ? limitBooksToDisplay : 5;
  // Значение id книги, с которой начинается отображение группы книг.
  const offset: number =
    +(req.query.page || 1) * adminLimitBooks - adminLimitBooks;

  try {
    let books: Book[] = (
      await dbConnection.query<Book[]>(SqlQuery.getBooksByPage, [
        offset,
        adminLimitBooks,
      ])
    )[0];

    // Получение значения общего количества книг, находящихся в БД.
    const booksLength: number = (
      await dbConnection.query<Book[]>(SqlQuery.getAllBooks)
    )[0].length;

    // Есть ли еще книга для отображения на странице в данной группе книг.
    const nextBooks: boolean = books.length > adminLimitBooks;
    const totalPages: number = Math.ceil(booksLength / adminLimitBooks);

    // Получение адреса отображаемой страницы.
    const path = getViewPath("admin-page") + "";

    // Добавление переменных в объект res.locals для передачи данных в представление.
    res.locals = {
      ...res.locals,
      success: req.query.success === "true",
      message: req.query.message || "",
    };

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
  //  let fileName: number = 0;
  //
  res.locals = {
    ...res.locals,
    success: req.query.success === "false",
    message: req.query.message || "",
  };

  try {
    // Получение данных о новой книге из тела запроса (из формы добавления новой книги).
    const { name, year, pages, description, ...authorsData } = req.body;

    // Дополнительная обработка полученных данных для обеспечения безопасных запросов в БД.
    const checkedData = {
      name: getSecureString(name),
      year: getSecureString(year),
      pages: getSecureString(pages),
      description: getSecureString(description),
      authors: getSecureString(Object.values(authorsData).join(", ")),
    };

    // Определение имени изображения обложки.
    let fileName: string = config.fileName;

    // Добавление книги в БД.
    const result = await dbConnection.query(SqlQuery.addBook, [
      checkedData.name,
      checkedData.year,
      checkedData.pages,
      checkedData.description,
      checkedData.authors,
      fileName,
    ]);

    // Проверка успешности добавления книги в БД.
    if (
      Array.isArray(result) &&
      result[0] &&
      "affectedRows" in result[0] &&
      result[0].affectedRows === 1
    ) {
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
      message: "Error adding a book!",
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

// Восстановление книги.
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
