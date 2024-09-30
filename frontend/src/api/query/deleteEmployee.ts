// api/employeeApi.ts
import { API } from "../index";
import axios from "../../utils/middleware";

export const deleteEmployee = async (id: string) => {
  const response = await axios.delete(`${API.employee.deleteEmployee(id)}`);
  return response.data;
};
