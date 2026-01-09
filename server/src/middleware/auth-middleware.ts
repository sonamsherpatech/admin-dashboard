import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import envConfig from "../config/config";
import {AuthRequest} from "../types/auth-request";

class AuthMiddleware {
  static authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authorization.split(" ")[0];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  
    try {
      const decoded = jwt.verify(token, envConfig.jwtSecretKey!);

      if (typeof decoded !== "object" || !("userId" in decoded)) {
        return res.status(401).json({
          message: "Invalid token payload",
        });
      }

      req.user = { userId: decoded.userId as string };

      next();
    } catch (error) {
      console.error("Error: ", error);
      return res.status(500).json({
        message: "Invalid or expired token",
      });
    }
  }
}

export default AuthMiddleware;
