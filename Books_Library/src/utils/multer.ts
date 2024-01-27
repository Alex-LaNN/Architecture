import multer from "multer";
import path from "path";
import { config } from "../modules/config";

let newFileName: string;
// Объявление объекта `storage` для хранения загруженных изображений.
export const storage = multer.diskStorage({
  // Определение места для загрузки изображений.
  destination: (req, file, cb) => {
    const pathImage = path.join(process.cwd(), "./src/views/images");
    cb(null, pathImage);
  },
  // Определение генерации имени файла для загружаемого изображения.
  filename: async (req, file, cb) => {
    newFileName =
      new Date().getTime() + "_" + Math.random().toString(36).substring(2, 9);
    config.fileName = newFileName;

    // Генерация нового имени файла с расширением .jpg
    cb(null, newFileName + ".jpg");
  },
});

//export default fileName
export const upload = multer({ storage });
