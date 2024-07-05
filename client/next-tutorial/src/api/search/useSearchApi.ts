import { useQuery } from "@tanstack/react-query";
import { api } from "../axiosConfig";

const getSearchResult = async (keyword: string) => {
  const result = await api({
    method: "get",
    url: `/search?keyword=${keyword}`,
  });

  return result.data.result;
};

export const useGetSearch = (keyword: string) => {
  const queryKey = ["useGetSearch", keyword];

  return useQuery({
    queryKey,
    queryFn: () => getSearchResult(keyword),
  });
};
