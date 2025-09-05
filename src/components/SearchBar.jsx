import React, { useState } from "react";
import useGalleryStore from "../store/useGalleryStore";

// Основной компонент строки поиска.
const SearchBar = () => {
  const [v, setV] = useState("");
  const setQuery = useGalleryStore((state) => state.setQuery);

  // Обработчик отправки формы.
  const onSubmit = (event) => {
    event.preventDefault(); // Предотврщение стандартной отправки формы.
    setQuery(v); // Установка нового поискового запроса в хранилище.
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      {" "}
      {/* Форма поиска */}
      <input
        value={v} // Связывание с локальным состоянием.
        onChange={(e) => setV(e.target.value)} // Изменение локального состояния при вводе.
        placeholder="Поиск..." // Подсказка внутри поля.
        className="...styles..." // Класс стилей дя красивого оформления.
      />
      <button className="btn" type="submit">
        Искать
      </button>
    </form>
  );
};

export default SearchBar;
