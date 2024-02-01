import cron from "node-cron";
import {
  getDataBaseDump,
  removeMarkedBooks,
  updateDB,
} from "../database/migrations/dataBase";

// Запуск запланированных задач (cron jobs).
export function startCron() {
  console.log(`c 10: Крон запущен.`);
  // Запуск удаления отмеченных книг.
  cron.schedule("*/2 * * * *", async () => {
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
  console.log(`c 23: Планирование прошло успешно...`);
}
