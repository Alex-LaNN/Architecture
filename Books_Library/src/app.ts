import express, { Express } from "express";
import cors from "./modules/corsConfig.js";
import path from "path";
import { router } from "./modules/router.js";
import { initializeDB } from "./database/migrations/dataBase.js";
import { port } from "./utils/params.js";

// Создание экземпляра приложения Express.
const app: Express = express();
app.use(express.json());
// Обработка 'URL-encoded' данных с расширенной поддержкой.
app.use(express.urlencoded({ extended: true }));
// Установка базовой директории для статических файлов.
const basePath = process.cwd();
app.use(express.static(path.join(basePath, "./src/views")));
// Подключение конфигурации 'CORS'.
app.use(cors);
// Установка движка для шаблонов 'EJS'.
app.set("view-engine", "ejs");
// Подключение роутов приложения.
app.use(router);
// Инициализация базы данных.
initializeDB();

// Start the Express server on the specified port.
app.listen(port, (): void => {
  console.log(`Server is running on the port: ${port}`);
});
