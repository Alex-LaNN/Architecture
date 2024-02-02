import { format } from "date-fns";
import path from "path";

// Processing a string received from the client.
export default function getSecureString(searchString: string) {
  // Removing potentially harmful characters.
  while (searchString.match(/\/\*|\-\-|;/g)) {
    searchString = searchString.replace(/\/\*|\-\-|;/g, "");
  }
  // Escaping special characters so that they are not interpreted as part of an SQL query.
  return searchString.replace(/"|'|`/g, (match) => `\\${match}`);
}

// Checking whether data has been added to the table.
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

// Getting the base path to the project root directory.
export function getBasePath() {
  return process.cwd();
}

// Get the absolute path to the view.
export function getViewPath(fileName: string): string {
  return path.resolve(
    getBasePath(),
    `../Books_Library/src/views/book/${fileName}.ejs`
  );
}

// Getting the absolute path to the file.
export function getPath(newFileName: string) {
  return getBasePath() + newFileName;
}

// Getting the current time in milliseconds.
export function getTime() {
  return new Date().getTime();
}

// Receiving the current time value in an easy-to-read format.
export function getCurrentTime() {
  return format(new Date(), "HH:mm:ss_yyyy");
}
