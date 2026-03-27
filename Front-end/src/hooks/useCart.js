import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../api/cart";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: 1000 * 60 * 5,
  });
};