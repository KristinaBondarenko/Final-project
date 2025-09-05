import React, { useEffect } from "react"; // Импортируем базовую библиотеку React и хук useEffect.

// Экспорт основного компонента Modal.
export default function Modal({
  open,        // Пропс, управляющий состоянием видимости модалки.
  onClose,     // Функциональный пропс, вызываемый при закрытии модального окна.
  children,    // Содержимое модального окна.
  maxWidth = "max-w-3xl" // Максимальная ширина модальной панели (можно переопределять).
}) {
  
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.(false); // Обработчик нажатия клавиши Escape.
    
    // Добавляем слушатель события keydown при открытом модальном окне.
    if (open) window.addEventListener("keydown", onKey);
    
  
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]); // Зависимости эффекта: открытое состояние и метод закрытия..

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]"> 
    {/* Абсолютное позиционирование поверх всего контента */}
      <div className="absolute inset-0 bg-black/40" onClick={() => onClose?.(false)} /> 
      
      {/* Основное модальное окно */}
      <div className={`absolute left-1/2 top-10 -translate-x-1/2 bg-white rounded-2xl shadow-xl p-6 ${maxWidth} w-[92%]`}>
        {children}
      </div>
    </div>
  );
}
