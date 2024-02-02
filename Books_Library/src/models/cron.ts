import cron from "node-cron";
import {
  getDataBaseDump,
  removeMarkedBooks,
  updateDB,
} from "../database/migrations/dataBase";
import { getCurrentTime } from "../utils/utils";

// Запуск запланированных задач (cron jobs).
export function startCron() {
  console.log(`c 11: Крон запущен в ${getCurrentTime()}.`);
  // Запуск удаления отмеченных книг.
  cron.schedule("*/5 * * * *", async () => {
    await removeMarkedBooks();
  });
  // Запуск резервного копирования базы данных.
  cron.schedule("1 * * * *", async () => {
    await getDataBaseDump();
  });
  // Запуск обновления базы данных.
  cron.schedule("3 * * * *", async () => {
    await updateDB();
  });
}
