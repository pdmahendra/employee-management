import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { API } from "../index";
export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  const response = await axios.post(`${API.users.login}`, data);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { user, token } = data;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", user.username);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};
