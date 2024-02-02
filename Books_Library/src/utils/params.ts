import { getEnvParams } from "../modules/dotenv";

// Получение и экспорт параметров из файла конфигурации.
export const { limitBooks, port, host } = getEnvParams();

// Определение ограничения на количество отображаемых книг на странице.
export const limitBooksToDisplay: number = +(limitBooks || 20);
