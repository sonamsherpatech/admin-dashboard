import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/auth-request";
import Admin from "../database/model/admin-model";

class AdminMiddleware {
  static async requireAdmin(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const admin = await Admin.findOne({
        where: { user_id: req.user.userId },
      });

      if (!admin) {
        return res.status(401).json({ message: "Admin acess only" });
      }

      next();
    } catch (error) {
      console.error("Error: ", error);
      return res.status(500).json({
        message: "Failed to recogize the user",
      });
    }
  }
}

export default AdminMiddleware;
