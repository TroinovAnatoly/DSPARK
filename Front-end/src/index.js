import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/providers/queryClient.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './styles/index.css';
import reportWebVitals from './app/providers/reportWebVitals.js';
import Header from './widgets/header.js';
import Footer from './widgets/footer.js';
import MainPage from './pages/MainPage.js';
import NewsPage from './pages/NewsPage.js';
import ShopPage from './pages/ShopPage.js';
import ItemPage from './pages/ItemPage.js';
import CompanyPage from './pages/CompanyPage.js';
import ProfilePage from './pages/ProfilePage.js';
import RegisterPage from './pages/RegisterPage.js';
import LoginPage from './pages/LoginPage.js';
import CartPage from './pages/CartPage.js';
import { Provider } from "react-redux";
import { store } from "./app/store/store.js";

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