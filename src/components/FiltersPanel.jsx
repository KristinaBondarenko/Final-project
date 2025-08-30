import React from 'react'
import { Heart, Trash2, Filter } from 'lucide-react'

export default function FiltersPanel({ form, setForm, onApply, onReset, styles, techniques }){
  return (<div className="card p-4 mb-4">
    <div className="flex items-center gap-2 text-sm mb-3">
      <Filter className="w-4 h-4"/> Фильтр
    </div>
    <div className="grid md:grid-cols-4 gap-3">
      <div>
        <div className="text-xs text-gray-500 mb-1">Цена от</div>
        <input type="number" value={form.priceMin} onChange={e=>setForm({...form,priceMin:e.target.value})} className="w-full px-3 py-2 rounded-xl border"/>
      </div>
      <div>
        <div className="text-xs text-gray-500 mb-1">Цена до</div>
        <input type="number" value={form.priceMax} onChange={e=>setForm({...form,priceMax:e.target.value})} className="w-full px-3 py-2 rounded-xl border"/>
      </div>
      <div>
        <div className="text-xs text-gray-500 mb-1">Стиль</div>
        <select value={form.style} onChange={e=>setForm({...form,style:e.target.value})} className="w-full px-3 py-2 rounded-xl border">
          <option value="">Все</option>
          {styles.map(s=><option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <div className="text-xs text-gray-500 mb-1">Техника</div>
        <select value={form.technique} onChange={e=>setForm({...form,technique:e.target.value})} className="w-full px-3 py-2 rounded-xl border">
          <option value="">Все</option>
          {techniques.map(s=><option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
    <div className="mt-3 flex gap-3">
      <button onClick={onApply} className="btn">
        <Heart className="w-4 h-4"/> Искать
      </button>
      <button onClick={onReset} className="btn">
        <Trash2 className="w-4 h-4"/> Сбросить
      </button>
    </div>
  </div>)
}