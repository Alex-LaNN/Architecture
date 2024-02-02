import { format } from "date-fns";
import path from "path";

// Обработка получаемой от клиента строки.
export default function getSecureString(searchString: string) {
  // Удаление потенциально опасных символов.
  while (searchString.match(/\/\*|\-\-|;/g)) {
    searchString = searchString.replace(/\/\*|\-\-|;/g, "");
  }
  // Экранирование специальных символов, чтобы они не интерпретировались как часть SQL-запроса.
  return searchString.replace(/"|'|`/g, (match) => `\\${match}`);
}

// Проверка факта добавления данных в таблицу.
export function checkUpdeteTable(
  resultForTableName: { affectedRows: number }[]
) {
  return (
    Array.isArray(resultForTableName) &&
    resultForTableName[0] &&
    "affectedRows" in resultForTableName[0] &&
    resultForTableName[0].affectedRows === 1
  );
}

// Получение базового пути к корневой директории проекта.
export function getBasePath() {
  return process.cwd();
}

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

//
export function getPath(newFileName: string) {
  // Получение текущего рабочего каталога.
  const basePath = process.cwd();
  return basePath + newFileName;
}

// Получение значения времени.
export function getTime() {
  return new Date().getTime();
}

// Получение значения текущего времени в удобночитаемом формате.
export function getCurrentTime() {
  return format(new Date(), "HH:mm:ss_yyyy");
}
