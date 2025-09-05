import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      {/* Кнопка "Назад" */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} // Нажатие уменьшает номер страницы.
        disabled={currentPage === 1} // Деактивируется, если первая страница.
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      {/* Индикатор текущей страницы */}
      <span>
        {currentPage} / {totalPages}
      </span>

      {/* Кнопка "Вперед" */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        } // Нажатие увеличивает номер страницы.
        disabled={currentPage === totalPages} // Деактивируется, если последняя страница.
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}
