import { format } from "date-fns";

// Обработка получаемой от клиента строки.
export default function getSecureString(searchString: string) {
  // Удаление потенциально опасных символов.
  while (searchString.match(/\/\*|\-\-|;/g)) {
    searchString = searchString.replace(/\/\*|\-\-|;/g, "");
  }
  // Экранирование специальных символов, чтобы они не интерпретировались как часть SQL-запроса.
  return searchString.replace(/"|'|`/g, (match) => `\\${match}`);
}

// Получение значения времени.
export function getTime() {
  return new Date().getTime();
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

//
export function getPath(newFileName: string) {
  // Получение текущего рабочего каталога.
  const basePath = process.cwd();
  return basePath + newFileName;
}

//
export function getCurrentTime() {
  return format(new Date(), "HH:mm:ss_yyyy");
}
