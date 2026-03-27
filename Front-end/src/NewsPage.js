import React from 'react';
import './news.css';
import { useNews } from './hooks/useNews';

function NewsPage() {

  const {
    data: news = [],
    isLoading,
    error
  } = useNews();

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки новостей</p>;

  return (
    <div id="content_news">

      {news.length === 0 && (
        <div id="news_card">
          <p id="news_card_text">Новостей пока нет...</p>
        </div>
      )}

      {news.map(item => (
        <div id="news_card" key={item.id}>
          <p id="news_card_title">{item.title}</p>

          <img
            src={`http://localhost:8000${item.image}`}
            alt="Нет изображения"
            id="news_card_img"
          />

          <p id="news_card_text">{item.text}</p>

          <p id="news_card_text">
            {new Date(item.created_at).toLocaleString()}
          </p>
        </div>
      ))}

    </div>
  );
}

export default NewsPage;