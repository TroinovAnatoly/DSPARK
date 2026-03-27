import React from 'react';
import './item.css';
import { useItems } from './hooks/useItems';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addItemToCart } from './api/items';

function ItemPage() {

  const queryClient = useQueryClient();

  const {
    data: items = [],
    isLoading,
    error
  } = useItems();

  // 🛒 Добавление в корзину
  const addMutation = useMutation({
    mutationFn: addItemToCart,

    onSuccess: () => {
      // обновим корзину
      queryClient.invalidateQueries(["cart"]);
    },

    onError: (error) => {
      alert(error.message);
    }
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки предметов</p>;

  return (
    <div id="content_items">

      {items.length === 0 && (
        <div id="item_card">
          <p id="item_card_name">Предметов пока нет</p>
          <p id="item_card_text">Зайдите позже</p>
        </div>
      )}

      {items.map(item => (
        <div id="item_card" key={item.id}>
          <p id="item_card_title">{item.title}</p>

          <img
            src={`http://localhost:8000${item.image}`}
            alt="Нет изображения"
            id="item_card_img"
          />

          <p id="item_card_text">{item.description}</p>
          <p id="item_card_rarity">Редкость: {item.rarity}</p>

          <button
            id="buy_button"
            onClick={() => addMutation.mutate(item.id)}
            disabled={addMutation.isLoading}
          >
            Купить: {item.price} ₽
          </button>
        </div>
      ))}

    </div>
  );
}

export default ItemPage;