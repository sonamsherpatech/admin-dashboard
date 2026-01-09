import { Response } from "express";
import { AuthRequest } from "../../../types/auth-request";
import User from "../../../database/model/user-model";

class UserController {
  static async getUsers(req: AuthRequest, res: Response) {
    try {
      const users = await User.findAll({
        attributes: ["user_id", "username", "email", "createdAt"],
      });

      res.status(200).json({
        data: users,
        message: "Users fetched sucessfully",
      });
    } catch (error) {
      console.error("Error: ", error);
      return res.status(500).json({
        message: "Failed to retrieve all users",
      });
    }
  }

  static async getProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const user = await User.findByPk(userId, {
        attributes: ["user_id", "username", "email", "createdAt"],
      });

      if (!user) {
        return res.status(404).json({
          message: "No user exists",
        });
      }

      res.status(200).json({
        data: user,
        message: "User fetched sucessfully",
      });
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({
        message: "Failed to get profile",
      });
    }
  }

  static async updateMyProfile(req: AuthRequest, res: Response) {}

  static async deleteUser(req: AuthRequest, res: Response) {}
}

export default UserController;
