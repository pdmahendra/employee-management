import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel"; 

export const authUser = async (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1]; 

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = { _id: user._id };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
