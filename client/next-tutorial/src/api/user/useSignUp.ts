import { useMutation } from "@tanstack/react-query";
import { api } from "../axiosConfig";

export const useUpdateSignUp = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api({
        method: "post",
        url: "/signup",
        data,
      });

      return response;
    },
  });
};
