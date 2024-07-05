import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, authApi } from "../axiosConfig";
import { useMutation } from "@tanstack/react-query";

interface commentPostType {
  boardId: string;
  commentContent: string | undefined;
}

interface commentPutType {
  commentId: string;
  commentContent: string | undefined;
}

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: commentPostType) => {
      const response = await authApi.post("/comment/write", data);

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

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: commentPutType) => {
      const response = await authApi.put(`/comment/${data.commentId}`, data);

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetBoardDetail"] });
      alert("댓글 수정에 성공했습니다.");
    },
    onError: () => {
      alert("댓글 수정에 실패했습니다.");
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      const response = await authApi.delete(`/comment/${commentId}`);

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetBoardDetail"] });
      alert("댓글이 삭제되었습니다.");
    },
    onError: () => {
      alert("댓글 삭제에 실패했습니다.");
    },
  });
};
