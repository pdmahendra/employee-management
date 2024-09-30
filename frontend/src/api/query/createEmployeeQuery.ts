import axios from "../../utils/middleware";
import { API } from "../index";
import { useMutation } from "@tanstack/react-query";

interface EmployeeData {
  name?: string;
  email?: string;
  mobileNo?: string;
  gender: string;
  designation?: string;
  courses?: string[];
}

export const createEmployeeQuery = async ({ data }: { data: EmployeeData }) => {
  const response = await axios.post(`${API.employee.createEmployee}`, data);
  return response.data.employees;
};

export const useCreateEmployeeQuery = () => {
  return useMutation({
    mutationFn: createEmployeeQuery,
  });
};
