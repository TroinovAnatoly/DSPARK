import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './header.js';
import Footer from './footer.js';
import MainPage from './main.js';
import NewsPage from './news.js';
import ShopPage from './shop.js';
import ItemPage from './item.js';
import CompanyPage from './company.js';
import ProfilePage from './profile.js';
import RegisterPage from './register.js';
import LoginPage from './login.js';
import CartPage from './Cart.js';

function App() {
  return(
  <div id="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/item" element={<ItemPage />} />
          <Route path="/company" element={<CompanyPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);