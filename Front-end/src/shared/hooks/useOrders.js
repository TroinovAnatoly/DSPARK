import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/profileApi";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
};