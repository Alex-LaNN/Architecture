import cors from "cors";
import { host, port } from "../utils/params.js";

// Создание конфигурации для обработки межсайтовых запросов (CORS).
const config = {
  // Разрешаются запросы только с указанного источника(для обеспечения безопасности приложения).
  origin: "http://" + host + ":" + port,
  // Разрешены следующие методы:
  methods: "GET,POST,PUT,PUTCH,DELETE",
  // Разрешается заголовок 'Content-Type'(для передачи данных в запросах).
  allowedHeaders: "Content-Type",
  // Разрешается передача cookie-файлов в запросах(для аутентификации и поддержания состояния сеанса).
  credentials: true,
};
// Создние и экспорт middleware-функцию 'CORS' с указанной конфигурацией.
export default cors(config);
