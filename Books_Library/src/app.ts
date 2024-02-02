import express, { Express } from "express";
import cors from "./modules/corsConfig.js";
import path from "path";
import { router } from "./modules/router.js";
import { initializeDB } from "./database/migrations/dataBase.js";
import { port } from "./utils/params.js";
import { startCron } from "./models/cron.js";

// Start scheduled tasks.
startCron();
// Create an Express application instance.
const app: Express = express();
app.use(express.json());
// Handling 'URL-encoded' data with enhanced support.
app.use(express.urlencoded({ extended: true }));
// Set a base directory for static files.
const basePath = process.cwd();
app.use(express.static(path.join(basePath, "src", "views")));
// Connection of 'CORS' configuration.
app.use(cors);
// Installing the 'EJS' template engine.
app.set("view-engine", "ejs");
// Connecting app routes.
app.use(router);
// Database Initialization.
initializeDB();

// Start the Express server on the specified port.
app.listen(port, (): void => {
  console.log(`Server is running on the port: ${port}`);
});
