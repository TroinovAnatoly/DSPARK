import React, { useEffect, useState } from 'react';
import './index.css';
import Shop_Image from './shop_logo.png';
import Item_Image from './item_logo.png';
import {Link} from "react-router-dom";

let flag = false

function LastNews() {
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/news/last/")
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error(err));
  }, []);

  if (!news) {
    return <p>Новостей пока нет</p>;
  }

  return (
    <div id="news_place">
      <p id="news_card_title">{news.title}</p>
      {news.image && (
        <img
          src={`http://localhost:8000${news.image}`}
          alt="news"
          style={{ width: "100%" }}
          id="news_card_img"
        />
      )}
      <p id="news_card_text">{news.text}</p>
    </div>
  );
}

const MainPage = () => {
    return(
      <div id="content">
        <Link to="news" id="first_blocks">
          <div id="news">
            <LastNews />
          </div>
        </Link>
        <Link to="/shop" id="second_blocks">
          <div id="game_shop" class="game_item_shop_card">
            <p class="name_card">Магазин</p>
            <img src={Shop_Image} alt="Хаха" id="second_blocks_image"></img>
          </div>
        </Link>
        <Link to="/item" id="second_blocks">
          <div id="item_store" class="game_item_shop_card">
            <p class="name_card">Торговая площадка</p>
            <img src={Item_Image} alt="Хаха" id="second_blocks_image"></img>
          </div>
        </Link>
        <Link to="/cart" id="theerd_blocks">
          <div id="item_store" class="game_item_shop_card">
            <p class="name_card">Корзина</p>
          </div>
        </Link>
      </div>
    )
}
  

export default MainPage;