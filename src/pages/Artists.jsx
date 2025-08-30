
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/artists").then((res) => setArtists(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Наши художники</h2>
      <div className="grid gap-8">
        {artists.map((artist) => (
          <div key={artist.id} className="bg-white shadow p-4 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <Link to={`/artist/${artist.id}`}>
                <img src={artist.avatar} alt={artist.name} className="w-20 h-20 rounded-full object-cover border" />
              </Link>
              <Link to={`/artist/${artist.id}`} className="text-xl font-semibold hover:underline">
                {artist.name}
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto">
              {artist.works.map((work) => (
                <Link key={work.id} to={`/art/${work.id}`}>
                  <img src={work.image} alt={work.title} className="w-32 h-32 object-cover rounded-lg shadow" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}