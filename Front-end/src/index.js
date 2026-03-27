import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './header.js';
import Footer from './footer.js';
import MainPage from './MainPage.js';
import NewsPage from './NewsPage.js';
import ShopPage from './ShopPage.js';
import ItemPage from './ItemPage.js';
import CompanyPage from './company.js';
import ProfilePage from './ProfilePage.js';
import RegisterPage from './register.js';
import LoginPage from './login.js';
import CartPage from './CartPage.js';
import { Provider } from "react-redux";
import { store } from "./store/store";

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
      <ReactQueryDevtools initialIsOpen={false} />
  </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);