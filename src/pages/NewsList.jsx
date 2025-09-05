import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Ошибка загрузки новостей:", err));
  }, []);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-10 mt-10"></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((n) => (
          <Link
            key={n.id}
            to={`/news/${n.id}`}
            className="block rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
          >
            <img
              src={n.image}
              alt={n.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{n.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

