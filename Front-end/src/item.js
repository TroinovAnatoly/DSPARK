import React, { useEffect, useState } from 'react';
import './item.css';
import Image from './phonk_wallpaper.jpg';

function ItemPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadItems() {
      try {
        const response = await fetch("http://localhost:8000/api/items/");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Ошибка загрузки предметов:", error);
      }
    }

    loadItems();
  }, []);

  async function addItemToCart(itemId) {
    const token = localStorage.getItem("access");

    await fetch("http://localhost:8000/api/cart/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ item_id: itemId })
    });
  }

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
          <img src={`http://localhost:8000${item.image}`} alt="Ну нету авы, я что сделаю!"id="item_card_img" />
          <p id="item_card_text">{item.description}</p>
          <p id="item_card_rarity">Редкость: {item.rarity}</p>
          <button onClick={() => addItemToCart(item.id)} id="buy_button">Купить: {item.price} ₽</button>
        </div>
      ))}

    </div>
  );
}

export default ItemPage;
