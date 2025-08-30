import React from 'react'
export default function SortBar({ sortKey, order, onChange }){
  const toggle=(k)=> onChange(k, sortKey===k && order==='desc' ? 'asc':'desc')
  const Btn=({label, active, onClick})=>(
    <button onClick={onClick} className={'text-sm '+(active?'font-semibold underline':'')}>
      {label}{active?(order==='asc'?' ↑':' ↓'):''}
    </button>
  )
  return (<div className="flex items-center gap-3">
    <span className="text-sm text-gray-600">Сортировать:</span>
    <Btn label="По цене" active={sortKey==='price'} onClick={()=>toggle('price')}/>
    <Btn label="По дате" active={sortKey==='date'} onClick={()=>toggle('date')}/>
  </div>)
}