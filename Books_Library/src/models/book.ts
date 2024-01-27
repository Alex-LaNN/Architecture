import { RowDataPacket } from "mysql2/promise";

export interface Book extends RowDataPacket {
  id: number;
  name: string;
  year: number;
  pages: number;
  description: string;
  authors: string;
  views: number;
  clicks: number;
  deleted: number;
}
