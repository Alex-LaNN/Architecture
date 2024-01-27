// Обработка получаемой от клиента строки.
export default function getSecureString(searchString: string) {
  // Удаление потенциально опасных символов.
  while (searchString.match(/\/\*|\-\-|;/g)) {
    searchString = searchString.replace(/\/\*|\-\-|;/g, "");
  }
  // Экранирование специальных символов, чтобы они не интерпретировались как часть SQL-запроса.
  return searchString.replace(/"|'|`/g, (match) => `\\${match}`);
}