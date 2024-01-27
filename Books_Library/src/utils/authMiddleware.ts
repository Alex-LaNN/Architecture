import { getEnvParams } from "../modules/dotenv.js";
import { Request, Response, NextFunction } from "express";
import basicAuth from "express-basic-auth";

/* Получение значения параметра 'adminParam' из переменных окружения
  и преобразование его в строку. */
const access: string = getEnvParams().adminParam!;

// Создание 'middleware' для базовой аутентификации с заданными параметрами.
export const auth = basicAuth({
  // Список пользователей и их паролей.
  users: { admin: "pass" },
  // Сообщение в случае неавторизованного доступа.
  unauthorizedResponse: "Unauthorized",
  // Флаг, указывающий необходимость отправления заголовка 'WWW-Authenticate'.
  challenge: true,
});

// Создание функцию 'middleware' для проверки авторизации.
export default function getAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Получение значения заголовка 'Authorization' из запроса.
  const user = req.get("authorization");
  /* Если заголовок 'Authorization' отсутствует или его значение не совпадает 
    с 'access' => отправка заголовка 'WWW-Authenticate' с соответствующей 
    ошибкой 401 (Unauthorized) */
  if (!user && access !== user) {
    res.set("WWW-Authenticate", 'Basic realm="Login Required"');
    res.status(401);
  } else {
    // Если авторизация прошла успешно => вызов следующей функции в цепочке 'middleware'.
    return next();
  }
}
