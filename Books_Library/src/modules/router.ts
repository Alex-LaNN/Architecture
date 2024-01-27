import express, { Router } from "express";
import * as userController from "../controllers/userController.js";
import * as adminController from "../controllers/adminController.js";
import { findBooks } from "../controllers/bookController.js";
import { upload } from "../utils/multer.js";
import auth from "express-basic-auth";

// Создание экземпляра роутера 'Express'.
export const router: Router = express.Router();
// Обработка 'URL-encoded' данных с расширенной поддержкой.
router.use(express.urlencoded({ extended: true }));
// Настройка базовой аутентификации.
const authData = {
  users: { admin: "pass" },
  challenge: true,
};

// Роуты для пользователей.
router.get("/", userController.getAllBooksPage);
router.get("/book/:id", userController.getBookPage);
router.get("/search", findBooks);
router.patch("/book/:id", userController.incrementWantCount);

// Роуты для администратора (с базовой аутентификацией).
router.get("/admin/api/v1/", auth(authData), adminController.getAdminPage);
router.get("/logout", adminController.getLogout);
router.post(
  "/admin/api/v1/add_book",
  auth(authData),
  upload.single("image"),
  adminController.addBook
);
router.delete(
  "/admin/api/v1/delete_book/:id",
  auth(authData),
  adminController.deleteBook
);
router.patch(
  "/admin/api/v1/recover_book/:id",
  auth(authData),
  adminController.recoverBook
);
