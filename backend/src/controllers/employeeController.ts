import { Request, Response } from "express";
import Employee, { IEmployee } from "../models/employeeModel";

export const createEmployee = async (req: any, res: Response) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;

    if (!name || !email || !mobile || !designation || !gender || !course) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isEmployeeExist = await Employee.findOne({ email });
    if (isEmployeeExist) { 
      return res
        .status(400)
        .json({ message: "Employee with same email already exists" });
    }
    const employee: IEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image: `${req.file?.filename}`,
      userId: req.user?._id,
    });
    

    await employee.save();

    return res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getEmployeeList = async (req: any, res: Response) => {
  try {
    const userId = req.user?._id;

    const employees = await Employee.find({ userId });

    return res
      .status(200)
      .json({ message: "Employee list fetch successfully", employees });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getEmployeeById = async (req: any, res: Response) => {
    try {
      const userId = req.user?._id; 
      const employeeId = req.params.id; 
  
      const employee = await Employee.findOne({ _id: employeeId, userId });
  
      if (!employee) {
        return res.status(404).json({ message: "Employee not found"});
      }
  
      return res.status(200).json({
        message: "Employee fetched successfully",
        employee,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  };

export const editEmployee = async (req: Request, res: Response) => {
    try {
      const employeeId = req.params.id;
      const updatedFields: Partial<IEmployee> = req.body; 
  
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      if (req.file) {
        updatedFields.image = req.file.path; 
      }
  
      Object.assign(employee, updatedFields);
  
      await employee.save();
  
      return res.status(200).json({ message: "Employee updated successfully", employee });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  };

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
      const employeeId = req.params.id;
  
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      await Employee.findByIdAndDelete(employeeId);
  
      return res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  };