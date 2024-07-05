import { useQuery, useQueries } from "@tanstack/react-query";
import { api, authApi } from "../axiosConfig";
import { useMutation } from "@tanstack/react-query";

const fetchData = async (type: string, page: number, pageSize: number) => {
  const result = await api({
    method: "get",
    url: `/board/list?type=${type}&page=${page}&pageSize=${pageSize}`,
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

interface getBoardListParams {
  type: string;
  page: number;
  pageSize: number;
}

type useGetBoardsListParams = getBoardListParams[];

export const useGetBoardsList = (params: useGetBoardsListParams) => {
  const results = useQueries({
    queries: params.map(({ type, page, pageSize }) => ({
      queryKey: ["useGetBoardsList", type, page, pageSize],
      queryFn: () => fetchData(type, page, pageSize),
    })),

    combine: (results) => {
      return {
        data: Object.assign(
          {},
          ...results.map((result, idx) => {
            return { [params[idx].type]: result.data?.boardList };
          })
        ),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  return results;
};

export const useGetBoardList = (
  type: string,
  page: number,
  pageSize: number
) => {
  const queryKey = ["useGetBoardList", type];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(type, page, pageSize),
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
      const response = await authApi({
        method: "post",
        url: "/board/write",
        data: data,
      });

      return response;
    },
  });
};

export const useDeleteBoard = () => {
  return useMutation({
    mutationFn: async (boardId: string) => {
      const response = await authApi({
        method: "delete",
        url: `/board/${boardId}`,
      });

      return response;
    },

    onSuccess: (res) => {
      alert("게시글이 삭제되었습니다.");
    },

    onError: (err) => {
      alert("게시글 삭제에 실패했습니다.");
    },
  });
};
