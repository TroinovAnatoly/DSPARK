import React, { useEffect, useState } from 'react';
import './shop.css';
import Image from './phonk_wallpaper.jpg';

function ShopPage() {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    async function loadGames() {
      try {
        const response = await fetch("http://localhost:8000/api/games/");
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Ошибка загрузки игр:", error);
      }
    }

    loadGames();
  }, []);

  async function addGameToCart(gameId) {
    const token = localStorage.getItem("access");

    await fetch("http://localhost:8000/api/cart/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ game_id: gameId })
    });
  }

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
          <img src={`http://localhost:8000${game.image}`} alt="Ну нету авы, я что сделаю!" id="game_card_img" />
          <p id="game_card_text">{game.description}</p>
          <button onClick={() => addGameToCart(game.id)} id="buy_button">Купить: {game.price} ₽</button>
        </div>
      ))}

    </div>
  );
}

export default ShopPage;
