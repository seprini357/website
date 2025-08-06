import { useState } from "react";
import PaginationPrevious from "./PaginationPrevious";
import PaginationList from "./PaginationList";
import PaginationNext1 from "./PaginationNext1";
import PropTypes from "prop-types";
import styles from "./Pagination.module.css";

const Pagination = ({ className = "", size = 16, size1 = 16 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const handleClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className={[styles.pagination, className].join(" ")}>
      <PaginationPrevious
        state={currentPage === 1 ? "Disabled" : "Default"}
        size={size}
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
      />
      <PaginationList
        currentPage={currentPage}
        totalPages={totalPages}
        onPageClick={handleClick}
      />
      <PaginationNext1
        state={currentPage === totalPages ? "Disabled" : "Default"}
        size={size1}
        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
      />
    </div>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  size: PropTypes.any,
  size1: PropTypes.any,
};

export default Pagination;

