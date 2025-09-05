import React, { useState } from "react";
import ArtCard from "../components/ArtCard";
import PaginationControls from "./PaginationControls";

const PaginatedGallery = ({ artworks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // сколько карточек на одной странице..

  const totalPages = Math.ceil(artworks.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = artworks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6 mt-6">

      {/* Сетка карточек */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentItems.map((art) => (
          <ArtCard key={art.id} item={art} />
        ))}
      </div>

      {/* Пагинация */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PaginatedGallery;

