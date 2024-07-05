import { useMutation, useQuery } from "@tanstack/react-query";
import { api, authApi } from "../axiosConfig";

export const useUpdateLogin = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api({
        method: "post",
        url: "/login",
        data,
      });

      return response;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await authApi({
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

const getAuth = async () => {
  const result = await authApi({
    method: "get",
    url: "/auth",
  });

  const userInfo = result.data;

  return userInfo;
};

export const useAuth = () => {
  const queryKey = ["useAuth"];

  return useQuery({
    queryKey,
    queryFn: () => getAuth(),
  });
};
