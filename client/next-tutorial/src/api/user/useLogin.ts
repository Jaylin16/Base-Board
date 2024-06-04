import axios from "axios";
import { useMutation } from "@tanstack/react-query";

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
