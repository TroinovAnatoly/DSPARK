import React, { useEffect } from "react";
import "../styles/item.css";

import { useAppDispatch, useAppSelector } from "../app/store/hooks/reduxHooks";

import { fetchItems } from "../app/store/thunks/itemsThunks";
import { addItemToCart } from "../app/store/thunks/cartThunks";

function ItemPage() {
  const dispatch = useAppDispatch();

  const { items, loading, error } = useAppSelector(
    (state) => state.items
  );

  const cartLoading = useAppSelector(
    (state) => state.cart.loading
  );

  // загрузка предметов
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // добавление в корзину
  const handleAddToCart = async (id) => {
    try {
      await dispatch(addItemToCart(id)).unwrap();

      // обновляем корзину после покупки
      dispatch(fetchItems());
    } catch (error) {
      alert("Ошибка: " + error);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки предметов</p>;

  return (
    <div id="content_items">

      {items.length === 0 && (
        <div id="item_card">
          <p id="item_card_name">Предметов пока нет</p>
          <p id="item_card_text">Зайдите позже</p>
        </div>
      )}

      {items.map((item) => (
        <div id="item_card" key={item.id}>
          <p id="item_card_title">{item.title}</p>

          <img
            src={`http://localhost:8000${item.image}`}
            alt="Нет изображения"
            id="item_card_img"
          />

          <p id="item_card_text">{item.description}</p>
          <p id="item_card_rarity">
            Редкость: {item.rarity}
          </p>

          <button
            id="buy_button"
            onClick={() => handleAddToCart(item.id)}
            disabled={cartLoading}
          >
            Купить: {item.price} ₽
          </button>
        </div>
      ))}

    </div>
  );
}

export default ItemPage;