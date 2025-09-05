import React from 'react'; 

// Компонент SortBar для отображения панели сортировки.
export default function SortBar({ sortKey, order, onChange }) {
 
  const toggle = (k) => onChange(k, sortKey === k && order === 'desc' ? 'asc' : 'desc');

  const Btn = ({ label, active, onClick }) => (
    <button
      onClick={onClick} // Обработчик клика для переключения сортировки.
      className={'text-sm ' + (active ? 'font-semibold underline' : '')} 
    >
      {label} 
      {active ? (order === 'asc' ? ' ↑' : ' ↓') : ''} 
      {/* Стрелка для указания направления сортировки */}
    </button>
  );

  return (
    <div className="flex items-center gap-3"> 
      <span className="text-sm text-gray-600">Сортировать:</span> 
      <Btn label="По цене" active={sortKey === 'price'} onClick={() => toggle('price')} />
        {/* Кнопка для сортировки по цене */}
      <Btn label="По дате" active={sortKey === 'date'} onClick={() => toggle('date')} /> 
        {/* Кнопка для сортировки по дате */}
    </div>
  );
}
