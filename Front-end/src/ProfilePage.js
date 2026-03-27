import React, { useEffect } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./store/hooks/reduxHooks";

import { fetchUser } from "./store/thunks/authThunks";
import { fetchOrders } from "./store/thunks/ordersThunks";
import { logout } from "./store/slices/authSlice";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // данные пользователя
  const {
    user,
    loading: profileLoading,
    error: profileError,
  } = useAppSelector((state) => state.auth);

  // заказы
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useAppSelector((state) => state.orders);

  // загрузка данных
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchOrders());
  }, [dispatch]);

  // logout
  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  // loading
  if (profileLoading || ordersLoading) {
    return <p>Загрузка...</p>;
  }

  // error
  if (profileError || ordersError) {
    return <p>Ошибка загрузки данных</p>;
  }

  return (
    <div id="content_profile">

      {/* 👤 USER INFO */}
      <div id="info_card">
        <p id="info_card_name">
          Информация о пользователе
        </p>

        <p id="info_card_text">
          {user
            ? `User: ${user.username}`
            : "Нету данных..."}{" "}
          <br />

          {user
            ? `Имя: ${user.first_name}`
            : "Нету данных..."}{" "}
          <br />

          {user
            ? `Фамилия: ${user.last_name}`
            : "Нету данных..."}
        </p>

        <button
          id="logout_button"
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </button>
      </div>

      {/* 📦 ORDERS */}
      <div id="purchase_history_card">
        <p id="purchase_history_card_title">
          История покупок
        </p>

        {orders.length === 0 && (
          <p>Покупок пока нет</p>
        )}

        {orders.map((order, index) => (
          <div
            id="operation_card"
            key={order.id}
          >
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