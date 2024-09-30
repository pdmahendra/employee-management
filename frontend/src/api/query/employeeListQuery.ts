import axios from "../../utils/middleware";
import { API } from "../index";
import { useQuery } from "@tanstack/react-query";

export const fetchEmployeeList = async () => {
  const response = await axios.get(`${API.employee.fetchEmployeeList}`);
  console.log(response.data.employees);
  return response.data.employees;
};

export const useFetchEmployeeList = () => {
  return useQuery({
    queryKey: ["fetchEmployeeList"],
    queryFn: fetchEmployeeList,
    
  });
};
