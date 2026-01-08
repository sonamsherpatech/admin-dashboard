import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../../../database/model/user-model";
import Admin from "../../../database/model/admin-model";
import jwt from "jsonwebtoken";
import envConfig from "../../../config/config";

class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({
          message: "Please provide username, email and password",
        });
      }

      const userCount = await User.count();

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });

      if (userCount === 0) {
        await Admin.create({
          user_id: user.user_id,
        });

        return res.status(201).json({
          message: "First admin created sucessfully",
        });
      }

      return res.status(200).json({
        message: "User Created Sucessfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Registration Failed",
      });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "Please provide email and password",
        });
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "Invalid Credential",
        });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(403).json({
          message: "Invalid Credential",
        });
      }

      const token = jwt.sign({ userId: user.user_id }, envConfig.jwtSecretKey, {
        expiresIn: "30d",
      });

      res.status(200).json({
        token,
        message: "Login Sucessfully",
      });
    } catch (error) {
      console.error("Error: ", error);
      return res.status(400).json({
        message: "Failed to  login",
      });
    }
  }
}

export default AuthController;
