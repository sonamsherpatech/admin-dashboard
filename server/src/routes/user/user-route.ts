import express, { Router } from "express";
import AuthMiddleware from "../../middleware/auth-middleware";
import AdminMiddleware from "../../middleware/admin-middleware";
import UserController from "../../controller/admin/user/user-controller";

const router: Router = express.Router();

router
  .route("/users")
  .get(
    AuthMiddleware.authenticate,
    AdminMiddleware.requireAdmin,
    UserController.getUsers
  );

router
  .route("/users/me")
  .get(AuthMiddleware.authenticate, UserController.getProfile);

export default router;
