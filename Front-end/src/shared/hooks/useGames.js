import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "../api/gamesApi";

export const useGames = () => {
  return useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
    staleTime: 1000 * 60 * 5,
  });
};