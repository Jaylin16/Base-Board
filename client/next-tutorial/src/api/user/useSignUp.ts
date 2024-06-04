import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const useUpdateSignUp = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signup`,
        data
      );

      return response;
    },
  });
};
