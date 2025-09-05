import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllImages } from "../services/images";
import ArtCard from "../components/ArtCard";

export default function ArtistDetail() {
  const { name } = useParams(); // имя из URL
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const all = await getAllImages();
        if (mounted) {
          // фильтруем только по этому художнику
          const filtered = all.filter(
            (img) => img.author === decodeURIComponent(name)
          );
          setArtworks(filtered);
        }
      } catch (e) {
        console.error("Ошибка загрузки художника:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [name]);

  if (loading) return <div className="container py-8">Загрузка…</div>;

  return (
    <div className="container py-8">
      <Link to="/artists" className="text-blue-600 hover:underline mb-4 mt-6 inline-block">
        ← Назад к художникам
      </Link>

      <h1 className="text-3xl font-bold mb-6">{decodeURIComponent(name)}</h1>

      {artworks.length === 0 ? (
        <p className="text-gray-600">У этого художника пока нет работ.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <ArtCard key={art.id} item={art} />
          ))}
        </div>
      )}
    </div>
  );
}


