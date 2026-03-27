import { useQuery } from "@tanstack/react-query";
import { fetchLastNews } from "../api/newsApi";

export const useLastNews = () => {
  return useQuery({
    queryKey: ["lastNews"],
    queryFn: fetchLastNews,
    staleTime: 1000 * 60 * 5,
  });
};