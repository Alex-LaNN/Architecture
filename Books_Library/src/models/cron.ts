import cron from "node-cron";
import {
  getDataBaseDump,
  removeMarkedBooks,
  updateDB,
} from "../database/migrations/dataBase";
import { getCurrentTime } from "../utils/utils";

// Running scheduled tasks (cron jobs).
export function startCron() {
  console.log(`c 11: Крон запущен в ${getCurrentTime()}.`);
  // Start deleting marked books.
  cron.schedule("*/5 * * * *", async () => {
    await removeMarkedBooks();
  });
  // Start a database backup.
  cron.schedule("1 * * * *", async () => {
    await getDataBaseDump();
  });
  // Start the database update.
  cron.schedule("3 * * * *", async () => {
    await updateDB();
  });
}
