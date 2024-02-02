import multer from "multer";
import path from "path";
import { config } from "../modules/config";
import { getTime } from "./utils";

let newFileName: string;
// Declaration of a `storage` object to store downloaded images.
export const storage = multer.diskStorage({
  // Defining a location to upload images.
  destination: (req, file, cb) => {
    const pathImage = path.join(process.cwd(), "./src/views/images");
    cb(null, pathImage);
  },
  // Define the generation of a unique file name for the uploaded image.
  filename: async (req, file, cb) => {
    // Generating a unique file name.
    newFileName =
      getTime() +
      "_" +
      Math.random().toString(36).substring(2, 9).replace(":", "");
    config.fileName = newFileName;

    // Return the file name to write to.
    cb(null, newFileName + ".jpg");
  },
});

export const upload = multer({ storage });
