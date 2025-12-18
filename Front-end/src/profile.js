import React, { useEffect, useState } from 'react';
import './profile.css';
import Image from './phonk_wallpaper.jpg';
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("access");
      if (!token) return;

      const response = await fetch("http://localhost:8000/api/user/", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      setProfile(data);
    }

    async function loadOrders() {
      const token = localStorage.getItem("access");
      if (!token) return;

      const response = await fetch("http://localhost:8000/api/orders/", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      setOrders(data);
    }

    loadProfile();
    loadOrders();
  }, []);

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setProfile(null);
    navigate("/login");
  }

  return (
    <div id="content_profile">
      <div id="info_card">
        <p id="info_card_name">Информация о пользователе</p>

        <p id="info_card_text">
          {profile ? `User: ${profile.username}` : "Нету данных..."} <br />
          {profile ? `Имя: ${profile.first_name}` : "Нету данных..."} <br />
          {profile ? `Фамилия: ${profile.last_name}` : "Нету данных..."}
        </p>

        <button id="logout_button" onClick={logout}>
          Выйти из аккаунта
        </button>
      </div>

      <div id="purchase_history_card">
        <p id="purchase_history_card_title">История покупок</p>

        {orders.length === 0 && <p>Покупок пока нет</p>}

        {orders.map((order, index) => (
          <div id="operation_card" key={order.id}>
            <p id="operation_card_text">
              Покупка №{index + 1}
            </p>
            <p id="operation_card_price">
              Цена: {order.total_price} ₽
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ProfilePage;
