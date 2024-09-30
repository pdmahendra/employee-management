import express from "express";
import {
  createEmployee,
  getEmployeeList,
  getEmployeeById,
  editEmployee,
  deleteEmployee,
} from "../controllers/employeeController";
import { authUser } from "../middlewares/authMiddleware";
import upload from "../utils/upload";

const router = express.Router();

router.post(
  "/employee/create",
  authUser as any,
  upload.single("image"),
  createEmployee as any
);
router.get("/employee-list", authUser as any, getEmployeeList as any);
router.get("/get-employee/:id", authUser as any, getEmployeeById as any);
router.put(
  "/edit-employee/:id",
  authUser as any,
  upload.single("image"),
  editEmployee as any
);
router.delete("/delete/:id", authUser as any, deleteEmployee as any);

export default router;
