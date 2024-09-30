import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/userModel";

// User login
const userLogin = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(400).json({ message: "Invalid login details" });
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user: IUser = new User({
        username,
        password: hashedPassword,
      });

      await user.save();
    }

    const token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      token,
      user: {
        id: user?._id,
        username: user?.username,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { userLogin };
