import { RowDataPacket } from "mysql2/promise";

export interface Book extends RowDataPacket {
  id: number;
  name: string;
  year: number;
  pages: number;
  description: string; // описание
  authors: string;
  views: number; // количество просмотров
  clicks: number; // количество кликов
  deleted: number; // статус удаления
}
