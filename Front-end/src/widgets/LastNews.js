import React from "react";
import { useLastNews } from "../shared/hooks/useLastNews";

function LastNews() {
  const {
    data: news,
    isLoading,
    error
  } = useLastNews();

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки новости</p>;

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
          id="news_card_img"
          style={{ width: "100%" }}
        />
      )}

      <p id="news_card_text">{news.text}</p>
    </div>
  );
}

export default LastNews;