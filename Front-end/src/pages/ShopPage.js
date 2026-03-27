import React, { useEffect } from 'react';
import '../styles/shop.css';

import { useAppDispatch, useAppSelector } from '../app/store/hooks/reduxHooks';
import { fetchGames } from '../app/store/thunks/gamesThunks';
import { fetchCart, addGameToCart } from '../app/store/thunks/cartThunks';

function ShopPage() {

  const dispatch = useAppDispatch();

  const { games, loading, error } = useAppSelector(state => state.games);
  const cartLoading = useAppSelector(state => state.cart.loading);

  useEffect(() => {
    dispatch(fetchGames());
    dispatch(fetchCart());
  }, [dispatch]);

  // добавление в корзину
  const handleBuy = async (id) => {
    const result = await dispatch(addGameToCart(id));

    if (addGameToCart.fulfilled.match(result)) {
      dispatch(fetchCart());
    }
  };

  if (loading) return <p>Загрузка...</p>;
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
            onClick={() => handleBuy(game.id)}
            disabled={cartLoading}
          >
            Купить: {game.price} ₽
          </button>
        </div>
      ))}

    </div>
  );
}

export default ShopPage;