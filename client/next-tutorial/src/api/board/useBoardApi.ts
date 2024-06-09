import { useQuery } from "@tanstack/react-query";
import api from "../axiosConfig";

const fetchData = async (type: string) => {
  const result = await api({
    method: "get",
    url: `/board/list?type=${type}`,
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
