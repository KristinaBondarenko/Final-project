import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import useGalleryStore from "../store/useGalleryStore"; // Доступ к глобальному хранилищу состояния галерии.

/**
 * Компонент ArtCard выводит карточку произведения искусства с возможностью добавлять его в избранное и корзину.
 *
 * @param {{ id: number, title: string, artist?: { id: number, avatar: string, name: string }, url: string }} props.item Данные произведения искусства.
 */

export default function ArtCard({ item }) {
  const { favorites, toggleFavorite, addToCart } = useGalleryStore();
  const isFavorite = favorites.some((fav) => fav.id === item.id);

  return (
    <div className="relative group overflow-hidden rounded-xl shadow hover:shadow-lg transition bg-white">
      {/* Картинка */}
      <Link to={`/art/${item.id}`}>
        <img
          src={item.url}
          alt={item.title}
          className="w-full h-64 object-cover"
        />
      </Link>

      {/* Иконки сверху */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(item);
          }}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "text-red-500" : "text-gray-700"
            }`}
          />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addToCart(item);
          }}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
        >
          <ShoppingCart className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Подпись снизу */}
      <div className="p-3">
        <Link to={`/art/${item.id}`}>
          <div className="font-semibold text-lg">{item.title}</div>
        </Link>

        {/* Художник */}
        {item.artist && (
          <Link
            to={`/artist/${item.artist.id}`}
            className="flex items-center gap-2 mt-2"
          >
            <img
              src={item.artist.avatar}
              alt={item.artist.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-700 hover:underline">
              {item.artist.name}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
