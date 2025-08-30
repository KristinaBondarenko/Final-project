import React from 'react';

const Pagination = ({ page, perPage, total, onChange }) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onChange(newPage);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-4 py-2 mr-2 rounded-md bg-gray-200 hover:bg-gray-300"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Назад
      </button>
      <button
        className="px-4 py-2 ml-2 rounded-md bg-gray-200 hover:bg-gray-300"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;