import axios from "../../utils/middleware";
import { API } from "../index";
import { useQuery } from "@tanstack/react-query";

export const fetchEmployee = async (id: string) => {
  const response = await axios.get(`${API.employee.getEmployee(id)}`);
  return response.data.employee;
};

export const useFetchEmployee = (id: string) => {
  return useQuery({
    queryKey: ["fetchEmployee", id],
    queryFn: () => fetchEmployee(id),
    enabled: !!id,
  });
};
