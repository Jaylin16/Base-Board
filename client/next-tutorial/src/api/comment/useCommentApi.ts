import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../axiosConfig";
import { useMutation } from "@tanstack/react-query";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comment/write`,
        data
      );

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetBoardDetail"] });
    },
    onError: () => {
      alert("댓글 입력에 실패했습니다.");
    },
  });
};
