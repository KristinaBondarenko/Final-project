import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllImages } from "../services/images";

export default function Artists() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const all = await getAllImages();
        if (mounted) setImages(all);
      } catch (e) {
        if (mounted) setError("Не удалось загрузить работы");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  // Сгруппировать по автору
  const artists = useMemo(() => {
    const map = new Map();
    for (const img of images) {
      if (!img?.author) continue;
      if (!map.has(img.author)) map.set(img.author, []);
      map.get(img.author).push(img);
    }

    // Порядок художников
    const preferredOrder = [
      "Проказова Анна",
      "Иванов Сергей",
      "Русаков Денис",
      "Черепанова Мария",
      "Фомина Виктория",
      "Чернышёва Елена",
    ];

    const result = [];
    for (const name of preferredOrder) {
      if (map.has(name)) result.push({ name, artworks: map.get(name) });
    }
    // Добавить остальных (если появятся новые авторы)
    for (const [name, artworks] of map.entries()) {
      if (!preferredOrder.includes(name)) result.push({ name, artworks });
    }
    return result;
  }, [images]);

  if (loading) return <div className="container py-8">Загрузка…</div>;
  if (error) return <div className="container py-8 text-red-600">{error}</div>;

  return (
    <div className="container py-8 mb-10">
      <h1 className="text-2xl font-bold mb-6 mt-10"></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <div
            key={artist.name}
            onClick={() => navigate(`/artists/${encodeURIComponent(artist.name)}`)}
            className="cursor-pointer p-6 bg-white shadow rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{artist.name}</h2>
            <p className="text-gray-600 text-sm">
              Кол-во работ: {artist.artworks.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
