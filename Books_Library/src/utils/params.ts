import path from "path";
import { getEnvParams } from "../modules/dotenv";

// Получение абсолютного пути к представлению.
export function getViewPath(fileName: string): string {
  // Получение текущего рабочего каталога.
  const basePath = process.cwd();
  // Получение абсолютного пути к представлению.
  const viewPath = path.resolve(
    basePath,
    `../Books_Library/src/views/book/${fileName}.ejs`
  );
  return viewPath;
}

// Получение и экспорт параметров из файла конфигурации.
export const { limitBooks, port, host } = getEnvParams();

// Определение ограничения на количество отображаемых книг на странице.
export const limitBooksToDisplay: number = +(limitBooks || 20);
