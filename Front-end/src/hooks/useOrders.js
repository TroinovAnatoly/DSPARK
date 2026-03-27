import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/profile";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
};