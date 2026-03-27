import React from 'react';
import './index.css';
import Shop_Image from './shop_logo.png';
import Item_Image from './item_logo.png';
import { Link } from "react-router-dom";
import LastNews from "./LastNews";

const MainPage = () => {
  return (
    <div id="content">

      <Link to="/news" id="first_blocks">
        <div id="news">
          <LastNews />
        </div>
      </Link>

      <Link to="/shop" id="second_blocks">
        <div id="game_shop" className="game_item_shop_card">
          <p className="name_card">Магазин</p>
          <img src={Shop_Image} alt="shop" id="second_blocks_image" />
        </div>
      </Link>

      <Link to="/item" id="second_blocks">
        <div id="item_store" className="game_item_shop_card">
          <p className="name_card">Торговая площадка</p>
          <img src={Item_Image} alt="items" id="second_blocks_image" />
        </div>
      </Link>

      <Link to="/cart" id="theerd_blocks">
        <div id="item_store" className="game_item_shop_card">
          <p className="name_card">Корзина</p>
        </div>
      </Link>

    </div>
  );
};

export default MainPage;