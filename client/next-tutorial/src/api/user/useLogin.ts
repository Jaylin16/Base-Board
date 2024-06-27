import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../axiosConfig";

export const useUpdateLogin = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        data,
        { withCredentials: true }
      );

      return response;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await api({
        method: "post",
        url: "/logout",
      });

      return response;
    },
    onSuccess: () => {
      localStorage.removeItem("nickName");
    },
    onError: () => {
      alert("로그아웃에 실패했습니다.");
    },
  });
};
