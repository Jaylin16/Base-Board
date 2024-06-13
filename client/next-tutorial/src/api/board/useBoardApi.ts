import { useQuery } from "@tanstack/react-query";
import api from "../axiosConfig";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const fetchData = async (type: string) => {
  const result = await api({
    method: "get",
    url: `/board/list?type=${type}`,
  });

  return result.data;
};

const fetchDetailData = async (boardId: string) => {
  const result = await api({
    method: "get",
    url: `/board/${boardId}`,
  });

  return result.data;
};

export const useGetBoardList = (type: string) => {
  const queryKey = ["useGetBoardList", type];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(type),
  });
};

export const useGetBoardDetail = (boardId: string) => {
  const queryKey = ["useGetBoardDetail", boardId];

  return useQuery({
    queryKey,
    queryFn: () => fetchDetailData(boardId),
  });
};

export const usePostBoard = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/board/write`,
        data,
        { withCredentials: true }
      );

      return response;
    },
  });
};
