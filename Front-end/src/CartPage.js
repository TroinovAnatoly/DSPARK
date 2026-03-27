import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks/reduxHooks";

import {
  fetchCart,
  removeCartItem,
  buyCart,
} from "./store/thunks/cartThunks";

function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  function handleRemove(id) {
    console.log("REMOVE CLICK", id);
    dispatch(removeCartItem(id));
  }

  function handleBuy() {
    dispatch(buyCart());
  }

  if (!cart) return <p>Загрузка...</p>;

  return (
    <div id="content">
      <h2>Корзина</h2>

      {(!cart.items || cart.items.length === 0) && (
        <p>Корзина пуста</p>
      )}

      {cart.items?.map((item) => (
        <div key={item.id}>
          <p>
            {item.game?.title || item.item?.title} —{" "}
            {item.game?.price || item.item?.price} ₽
          </p>

          <button onClick={() => handleRemove(item.id)}>
            Удалить
          </button>
        </div>
      ))}

      <h3>Итого: {cart?.total ?? 0} ₽</h3>

      <button onClick={handleBuy}>
        Купить
      </button>
    </div>
  );
}

export default CartPage;