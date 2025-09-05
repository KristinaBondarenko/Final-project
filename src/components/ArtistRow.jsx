import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtCard from "./ArtCard"; // импортируем для отображения отдельной картины

//Компонент ArtistRow принимает пропсы: имя художника, id, массив работ.

export default function ArtistRow({ artistName, artistId, artworks }) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;
  const navigate = useNavigate();
  const prev = () => setStartIndex((i) => Math.max(0, i - 1));
  const next = () =>
    setStartIndex((i) =>
      Math.min(Math.max(artworks.length - visibleCount, 0), i + 1)
    );

  const fallbackAvatar = artistName
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        artistName
      )}&background=random`
    : "https://via.placeholder.com/80";

  return (
    <div className="flex items-start gap-6">
      {/* Левая колонка */}
      <div className="w-56 shrink-0 text-center">
        <img
          src={artworks[0]?.artist?.avatar || fallbackAvatar}
          alt={artistName}
          className="w-20 h-20 object-cover rounded-full mx-auto cursor-pointer"
          onClick={() => navigate(`/artist/${artistId}`)}
        />
        <div
          onClick={() => navigate(`/artist/${artistId}`)}
          className="text-lg font-semibold underline underline-offset-2 mt-2 cursor-pointer hover:text-indigo-600"
        >
          {artistName}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {artworks.length} работ(ы)
        </div>
      </div>

      {/* Правая колонка: слайдер */}
      <div className="relative flex-1">
        <div className="flex gap-4 overflow-hidden">
          {artworks.slice(startIndex, startIndex + visibleCount).map((item) => (
            <ArtCard key={item.id} item={item} />
          ))}
        </div>

        {startIndex > 0 && (
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full px-3 py-1 shadow"
            aria-label="Назад"
          >
            ❮
          </button>
        )}
        {startIndex + visibleCount < artworks.length && (
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/100 rounded-full px-2 py-1 shadow"
            aria-label="Вперёд"
          >
            ❯
          </button>
        )}
      </div>
    </div>
  );
}
