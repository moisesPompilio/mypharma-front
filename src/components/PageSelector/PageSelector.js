import "./PageSelector.scss";
import { useEffect, useState } from "react";

const PageSelector = ({ totalPages, currentPage, onPageChange }) => {
  const [page, setPage] = useState(parseInt(currentPage));
  useEffect(() => {
    setPage(parseInt(currentPage))    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  const handleFirstClick = () => {
    if (page !== 1) {
      setPage(1);
      onPageChange(1);
    }
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
      onPageChange(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      setPage(page + 1);
      onPageChange(page + 1);
    }
  };

  const handleLastClick = () => {
    if (page !== totalPages) {
      setPage(totalPages);
      onPageChange(totalPages);
    }
  };

  return (
    <div className="page-selector">
      <button onClick={handleFirstClick} disabled={page === 1}>
        First
      </button>
      <button onClick={handlePreviousClick} disabled={page === 1}>
        Previous
      </button>
      <span id="number-page">{page}</span>
      <button onClick={handleNextClick} disabled={page === totalPages}>
        Next
      </button>
      <button onClick={handleLastClick} disabled={page === totalPages}>
        Last
      </button>
    </div>
  );
};

export default PageSelector;
