import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminPage from "./pages/AdminPage";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import ArtistDetail from "./pages/ArtistDetail";
import AdminLayout from "./components/AdminLayout";
import ControlPanel from "./pages/Admin/ControlPanel";
import Paintings from "./pages/Admin/Paintings";

const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Artists = lazy(() => import("./pages/Artists"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const PaymentResult = lazy(() => import("./pages/PaymentResult"));
const ArtDetail = lazy(() => import("./pages/ArtDetail"));

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        style={{
          backgroundImage:
            'url("https://i.pinimg.com/1200x/71/f5/da/71f5daf1ff4096ffbcbe191bf12c2f98.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
        className="flex-1"
      >
        <Suspense fallback={<div className="container py-8">Загрузка…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<PaymentResult />} />
            <Route path="/art/:id" element={<ArtDetail />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/news" element={<NewsList />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:name" element={<ArtistDetail />} />
            <Route path="/admin" element={<AdminLayout />}>
            <Route path="Paintings" element={<Paintings />} />
            <Route index element={<ControlPanel />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
