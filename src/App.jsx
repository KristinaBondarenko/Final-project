import React,{Suspense,lazy} from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

const Home=lazy(()=>import('./pages/Home'))
const Catalog=lazy(()=>import('./pages/Catalog'))
const Artists=lazy(()=>import('./pages/Artists'))
const News=lazy(()=>import('./pages/News'))
const Favorites=lazy(()=>import('./pages/Favorites'))
const Cart=lazy(()=>import('./pages/Cart'))
const Checkout=lazy(()=>import('./pages/Checkout'))
const PaymentResult=lazy(()=>import('./pages/PaymentResult'))
const ArtDetail=lazy(()=>import('./pages/ArtDetail'))

export default function App(){
  return (<div className='min-h-screen flex flex-col'>
    <Header/>
    <main className='flex-1'>
      <Suspense fallback={<div className='container py-8'>Загрузка…</div>}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/catalog' element={<Catalog/>}/>
          <Route path='/artists' element={<Artists/>}/>
          <Route path='/news' element={<News/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/payment' element={<PaymentResult/>}/>
          <Route path='/art/:id' element={<ArtDetail/>}/>
        </Routes>
      </Suspense>
    </main>
    <Footer/>
  </div>)
}