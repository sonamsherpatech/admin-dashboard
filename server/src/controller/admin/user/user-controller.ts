import { Response } from "express";
import { AuthRequest } from "../../../types/auth-request";
import User from "../../../database/model/user-model";
import { UniqueConstraintError } from "sequelize";

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
        message: "Profile fetched sucessfully",
      });
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({
        message: "Failed to get profile",
      });
    }
  }

  static async updateMyProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const { username, email } = req.body;
      if (!username || !email) {
        return res.status(400).json({
          message: "Please provide username and email",
        });
      }

      const [updatedRow] = await User.update(
        {
          username: username,
          email: email,
        },
        {
          where: {
            user_id: userId,
          },
        }
      );

      if (updatedRow === 0) {
        return res.status(404).json({
          message: "User not found or no changes were made",
        });
      }

      res.status(200).json({
        message: "Profile updated sucessfully",
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(409).json({
          message: "Email already in use",
        });
      }

      console.error("Error: ", error);
      return res.status(500).json({
        message: "Failed to update profile",
      });
    }
  }

  static async deleteUser(req: AuthRequest, res: Response) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({
          message: "User id is required",
        });
      }

      const deletedRow = await User.destroy({
        where: {
          user_id: userId,
        },
      });

      if (deletedRow === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "User deleted sucessfully",
      });
    } catch (error) {
      console.error("Error: ", error);
      return res.status(500).json({
        message: "Failed to delete user",
      });
    }
  }
}

export default UserController;
