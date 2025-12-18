import React, { useEffect, useState } from 'react';
import './news.css';

function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function loadNews() {
      try {
        const response = await fetch("http://localhost:8000/api/news/");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
      }
    }

    loadNews();
  }, []);

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

          <img src={`http://localhost:8000${item.image}`} alt="Ну нету авы, я что сделаю!" id="news_card_img"/>

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
