import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNews } from "../services/news";

export default function News() {
  const [items, setItems] = useState([]); // Массив новостей.
  const [loading, setLoading] = useState(true); // Показывает статус загрузки.
  const [error, setError] = useState(null); // Хранит ошибку загрузки.

  // Загружаем новости при монтировании компонента.
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllNews(); // Запрашиваем список новостей.
        setItems(data); // Обновляем массив новостей.
      } catch (e) {
        setError("Ошибка загрузки новостей"); // Сохраняем ошибку.
      } finally {
        setLoading(false); // Завершаем этап загрузк.
      }
    })();
  }, []); // Без зависимостей (выполняется однократно).

  if (loading) return <div className="container py-8">Загрузка…</div>;
  if (error) return <div className="container py-8 text-red-600">{error}</div>;

  // Основная структура компонента.
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Новости</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map(
          (
            n // Перебираем каждую новость.
          ) => (
            <Link // Каждая новость обернута ссылкой.
              key={n.id} // Уникальный ключ.
              to={`/news/${n.id}`} // Переход на отдельную новость.
              className="...styles..." // Внешний вид карточки.
            >
              <img
                src={n.image}
                alt={n.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{n.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {n.content}
                </p>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
