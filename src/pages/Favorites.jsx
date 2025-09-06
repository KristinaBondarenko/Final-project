import React from "react";
import useGalleryStore from "../store/useGalleryStore";
import ArtCard from "../components/ArtCard";

export default function Favorites() {
  const favorites = useGalleryStore((s) => s.favorites); // Получаем избранное из хранилища состояния.

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mt-4 mb-4">Избранное</h1>
      {favorites.length === 0 ? ( // Если избраное пустое.
        <div className="text-gray-500">Список пуст</div> // Отображаем сообщение.
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {favorites.map(
            (
              it // Отображаем список избранного.
            ) => (
              <ArtCard key={it.id} item={it} />
            )
          )}
        </div>
      )}
    </div>
  );
}
