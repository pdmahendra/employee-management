import axios from "../../utils/middleware";
import { API } from "../index";
import { useMutation } from "@tanstack/react-query";

interface EmployeeData {
  name?: string;
  email?: string;
  mobileNo?: string;
  gender?: string;
  designation?: string;
  courses?: string[];
}

type EditProps = {
  data: EmployeeData;
  id: string;
};
export const editEmployeeQuery = async ({ data, id }: EditProps) => {
  const response = await axios.put(`${API.employee.editEmployee(id)}`, data);
  return response.data.employees;
};

export const useEditEmployeeQuery = () => {
  return useMutation({
    mutationFn: editEmployeeQuery,
  });
};
