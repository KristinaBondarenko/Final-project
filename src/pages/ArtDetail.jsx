import React from 'react'
import { useParams } from 'react-router-dom'
import { getImage } from '../services/images'
import useGalleryStore from '../store/useGalleryStore'
export default function ArtDetail(){
  const { id } = useParams()
  const [item,setItem]=React.useState(null)
  const add = useGalleryStore(s=>s.addToCart)
  React.useEffect(()=>{ getImage(id).then(setItem) },[id])
  if(!item) return <div className="container py-8">Загрузка…</div>
  return (<div className="container py-8">
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <img src={item.url} alt={item.title} className="w-full rounded-2xl object-cover"/>
      <div>
        <div className="text-2xl font-semibold underline underline-offset-4">{item.author}</div>
        <div className="mt-2 text-lg">{item.title}</div>
        <div className="text-sm text-gray-600 mt-1">{item.size}</div>
        <div className="text-sm text-gray-600">Материалы: {item.materials}</div>
        <div className="text-sm text-gray-600">Год: {item.year}</div>
        <div className="mt-4 text-lg">Цена: {(item.price||0).toLocaleString('ru-RU')} руб</div>
        <div className="mt-3 flex gap-3">
          <button className="btn">Купить</button>
          <button className="btn-primary" onClick={()=>add(item)}>В корзину</button>
        </div>
      </div>
    </div>
  </div>)
}
