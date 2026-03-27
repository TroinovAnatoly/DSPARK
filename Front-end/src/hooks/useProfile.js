import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../api/profile";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
};