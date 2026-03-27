import React from "react";
import { useCart } from "./hooks/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCartItem, buyCart } from "./api/cart";

function CartPage() {
  const queryClient = useQueryClient();

  const {
    data: cart,
    isLoading,
    error,
  } = useCart();

  // ❌ Удаление товара (с оптимистичным обновлением)
  const removeMutation = useMutation({
    mutationFn: removeCartItem,

    onMutate: async (id) => {
      await queryClient.cancelQueries(["cart"]);

      const prevCart = queryClient.getQueryData(["cart"]);

      queryClient.setQueryData(["cart"], (old) => ({
        ...old,
        items: old.items.filter((i) => i.id !== id),
      }));

      return { prevCart };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(["cart"], context.prevCart);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  // 🛒 Покупка
  const buyMutation = useMutation({
    mutationFn: buyCart,

    onSuccess: () => {
      alert("✅ Покупка сохранена!");
      queryClient.invalidateQueries(["cart"]);
    },

    onError: (error) => {
      alert("❌ Ошибка: " + error.message);
    },
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки корзины</p>;

  return (
    <div id="content">
      <h2>Корзина</h2>

      {cart?.items?.length === 0 && <p>Корзина пуста</p>}

      {cart?.items?.map((item) => (
        <div key={item.id}>
          <p>
            {item.game?.title || item.item?.title} —{" "}
            {item.game?.price || item.item?.price} ₽
          </p>

          <button onClick={() => removeMutation.mutate(item.id)}>
            Удалить
          </button>
        </div>
      ))}

      <h3>Итого: {cart?.total} ₽</h3>

      <button
        id="buy_button"
        onClick={() => buyMutation.mutate()}
        disabled={buyMutation.isLoading}
      >
        Купить
      </button>
    </div>
  );
}

export default CartPage;