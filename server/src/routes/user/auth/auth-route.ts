import express, { Router } from "express";
import AuthController from "../../../controller/admin/auth/auth-controller";

const router: Router = express.Router();

router.route("/register").post(AuthController.registerUser);

export default router;
