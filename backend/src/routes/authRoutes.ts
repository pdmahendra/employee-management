import { userLogin } from "../controllers/authController";
import { Router } from "express";
const app = Router();

app.post("/login", userLogin as any);
export default app;
