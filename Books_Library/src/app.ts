import express from "express";
//import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv"
import { getParams } from "./modules/dotenv.js";
import config from "./modules/corsConfig.js"
import path from "path"
import { fileURLToPath } from "url";

dotenv.config();

const env = getParams();
const port = env.PORT
const app = express();
// To display requests incoming to the server in the console.
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(config)
export const mainPath: string = path.dirname(
  path.dirname(fileURLToPath(import.meta.url))
);
app.use(express.static(path.join(("./src/public"))));



// Start the Express server on the specified port.
const server = app.listen(port, (): void => {
  console.log(`Server is running on the port: ${port}`);
});
