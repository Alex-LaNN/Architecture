import multer from "multer";
import path from "path";
import { config } from "../modules/config";
import { getTime } from "./utils";

let newFileName: string;
// Объявление объекта `storage` для хранения загруженных изображений.
export const storage = multer.diskStorage({
  // Определение места для загрузки изображений.
  destination: (req, file, cb) => {
    const pathImage = path.join(process.cwd(), "./src/views/images");
    cb(null, pathImage);
  },
  // Определение генерации уникального имени файла для загружаемого изображения.
  filename: async (req, file, cb) => {
    // Генерация уникального имени файла.
    newFileName =
      getTime() +
      "_" +
      Math.random().toString(36).substring(2, 9).replace(":", "");
    config.fileName = newFileName;

    // Возвращение имени файла для записи.
    cb(null, newFileName + ".jpg");
  },
});

export const upload = multer({ storage });
