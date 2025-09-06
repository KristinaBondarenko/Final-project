import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsById } from "../services/news"; // Импортируем функцию для получения новости по id.

export default function NewsDetail() {
  const { id } = useParams(); // Получаем id новости из параметров маршрута.
  const [article, setArticle] = useState(null); // Состояние для хранения новости.
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки.
  const [error, setError] = useState(null); // Состояние для хранения ошибки.

  useEffect(() => {
    (async () => {
      try {
        const data = await getNewsById(id);
        setArticle(data);
      } catch (e) {
        setError("Не удалось загрузить статью");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="container py-8">Загрузка…</div>;
  if (error) return <div className="container py-8 text-red-600">{error}</div>;

  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 mt-10">{article.title}</h1>
      <img
        src={article.image}
        alt={article.title}
        className="rounded-2xl mb-6"
      />
      <p className="text-lg leading-relaxed">{article.content}</p>
    </div>
  );
}
