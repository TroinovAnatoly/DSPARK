import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/store/hooks/reduxHooks";
import "../styles/cart.css";

import {
  fetchCart,
  removeCartItem,
  buyCart,
} from "../app/store/thunks/cartThunks";

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
    <div id="content_cart">
      <h2>Корзина</h2>

      {(!cart.items || cart.items.length === 0) && (
        <p>Корзина пуста</p>
      )}

      {cart.items?.map((item) => (
        <div key={item.id} class="item">
          <p>
            {item.game?.title || item.item?.title} —{" "}
            {item.game?.price || item.item?.price} ₽
          </p>

          <button onClick={() => handleRemove(item.id)} class="item_button">
            Удалить
          </button>
        </div>
      ))}

      <h3>Итого: {cart?.total ?? 0} ₽</h3>

      <button onClick={handleBuy} class="buy_cart_button">
        Купить
      </button>
    </div>
  );
}

export default CartPage;