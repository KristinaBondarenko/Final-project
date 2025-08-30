import React from 'react'
import { getImages } from '../services/images'
import ArtCard from '../components/ArtCard'
import FiltersPanel from '../components/FiltersPanel'
import SortBar from '../components/SortBar'
import Pagination from '../components/Pagination'
import useGalleryStore from '../store/useGalleryStore'

export default function Catalog(){
  const [items,setItems]=React.useState([])
  const [total,setTotal]=React.useState(0)
  const [page,setPage]=React.useState(1)
  const [sortKey,setSortKey]=React.useState('price')
  const [order,setOrder]=React.useState('desc')
  const [form,setForm]=React.useState({priceMin:'',priceMax:'',style:'',technique:''})
  const query = useGalleryStore(s=>s.query)
  const perPage=12
  const styles=['Пейзаж','Портрет','Абстракция','Натюрморт','Минимализм']
  const techniques=['Масло','Акрил','Гуашь','Цифровая','Акварель']

  const fetchData=React.useCallback(()=>{
    const params={_page:page,_limit:perPage,_sort:sortKey,_order:order}
    if(query) params.q=query
    if(form.style) params.style=form.style
    if(form.technique) params.technique=form.technique
    if(form.priceMin) params.price_gte=form.priceMin
    if(form.priceMax) params.price_lte=form.priceMax
    getImages(params).then(({data,total})=>{setItems(data); setTotal(total)})
  },[page,sortKey,order,form,query])

  React.useEffect(()=>{ fetchData() },[fetchData])
  const onApply=()=>{ setPage(1); fetchData() }
  const onReset=()=>{ setForm({priceMin:'',priceMax:'',style:'',technique:''}); setPage(1); fetchData() }

  return (<div className="container py-8">
    <div className="flex items-center justify-between mb-2">
      <FiltersPanel form={form} setForm={setForm} onApply={onApply} onReset={onReset} styles={styles} techniques={techniques}/>
      <SortBar sortKey={sortKey} order={order} onChange={(k,o)=>{ setSortKey(k); setOrder(o); setPage(1) }}/>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {items.map(it=> <ArtCard key={it.id} item={it}/>)}
    </div>
    <Pagination page={page} perPage={perPage} total={total} onChange={setPage}/>
  </div>)
}
