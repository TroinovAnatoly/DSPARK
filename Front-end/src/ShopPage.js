import React from 'react';
import './shop.css';
import { useGames } from './hooks/useGames';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addGameToCart } from './api/games';

function ShopPage() {

  const queryClient = useQueryClient();

  const {
    data: games = [],
    isLoading,
    error
  } = useGames();

  // 🛒 добавление в корзину
  const addMutation = useMutation({
    mutationFn: addGameToCart,

    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },

    onError: (error) => {
      alert(error.message);
    }
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки игр</p>;

  return (
    <div id="content_games">

      {games.length === 0 && (
        <div id="game_card">
          <p id="game_card_name">Игр пока нет</p>
          <p id="game_card_text">Зайдите позже</p>
        </div>
      )}

      {games.map(game => (
        <div id="game_card" key={game.id}>
          <p id="game_card_title">{game.title}</p>

          <img
            src={`http://localhost:8000${game.image}`}
            alt="Нет изображения"
            id="game_card_img"
          />

          <p id="game_card_text">{game.description}</p>

          <button
            id="buy_button"
            onClick={() => addMutation.mutate(game.id)}
            disabled={addMutation.isLoading}
          >
            Купить: {game.price} ₽
          </button>
        </div>
      ))}

    </div>
  );
}

export default ShopPage;