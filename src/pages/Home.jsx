import React from 'react'
import { getImages } from '../services/images'
import { useNavigate } from 'react-router-dom'

function Slider({ items }){
  const [index,setIndex]=React.useState(0); const nav=useNavigate()
  const next=()=> setIndex((index+1)%items.length)
  const prev=()=> setIndex((index-1+items.length)%items.length)
  const cur=items[index]
  return (<div className="relative">
    <div className="overflow-hidden rounded-2xl">
      <img src={cur.url} alt={cur.title} className="w-full h-96 object-cover cursor-pointer" onClick={()=>nav('/art/'+cur.id)}/>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/50 text-white px-4 py-2 rounded-2xl text-center">
          <div className="text-lg font-semibold">{cur.title}</div>
          <div className="text-sm opacity-90">{cur.author}</div>
        </div>
      </div>
    </div>
    <button className="btn absolute left-2 top-1/2 -translate-y-1/2" onClick={prev}>‹</button>
    <button className="btn absolute right-2 top-1/2 -translate-y-1/2" onClick={next}>›</button>
    <div className="flex justify-center gap-2 mt-2">{items.map((_,i)=>(<button key={i} onClick={()=>setIndex(i)} className={'h-2 w-2 rounded-full '+(i===index?'bg-black':'bg-gray-300')}></button>))}</div>
  </div>)
}

export default function Home(){
  const [featured,setFeatured]=React.useState([])
  React.useEffect(()=>{ getImages({_limit:5,featured:true}).then(({data})=>setFeatured(data)) },[])
  return (<div className="container py-6 space-y-10">
    {featured.length>0 && <section><h2 className="text-xl font-semibold mb-3">Рекомендации</h2><Slider items={featured}/></section>}
    <section className="grid md:grid-cols-3 gap-6 items-start">
      <div className="md:col-span-2"><h1 className="text-2xl font-semibold mb-3">О нас</h1>
        <p className="text-gray-700">Мы — онлайн‑галерея современного искусства. Сохраняем и продвигаем работы молодых и известных авторов.</p>
      </div>
      <div className="card p-4"><div className="font-semibold mb-2">Контакты</div>
        <div className="text-sm">Email: hello@art.gallery</div><div className="text-sm">Тел: +7 (999) 123‑45‑67</div>
        <div className="text-sm">Адрес: Москва, Арт‑пространство 1</div>
      </div>
    </section>
    <section><h2 className="text-xl font-semibold mb-3">Отзывы</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[{name:'Анна',text:'Отличный сервис!',img:'https://i.pravatar.cc/100?img=1'},{name:'Денис',text:'Нашёл идеальную работу.',img:'https://i.pravatar.cc/100?img=12'},{name:'Мария',text:'Удобный сайт и выбор.',img:'https://i.pravatar.cc/100?img=5'}].map((r,i)=>(
          <div key={i} className="card p-4 flex items-center gap-3">
            <img src={r.img} alt={r.name} className="w-14 h-14 rounded-full object-cover"/>
            <div><div className="font-semibold">{r.name}</div><div className="text-sm text-gray-600">{r.text}</div></div>
          </div>
        ))}
      </div>
    </section>
  </div>)
}
