import { getEnvParams } from "../modules/dotenv";

// Receiving and exporting parameters from a configuration file.
export const { limitBooks, port, host } = getEnvParams();

// Defining a limit on the number of books displayed on a page.
export const limitBooksToDisplay: number = +(limitBooks || 20);
