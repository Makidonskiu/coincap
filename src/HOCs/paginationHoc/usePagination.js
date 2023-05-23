import { useState, useEffect } from "react";

export function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    if (data) {
      const totalPages = Math.ceil(data.length / itemsPerPage);
      setTotalPages(totalPages);
      setCurrentItems(data.slice(0, itemsPerPage));
    }
  }, [data, itemsPerPage]);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function goToPage(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(data.slice(startIndex, endIndex));
  }, [currentPage, data, itemsPerPage]);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  };
}
