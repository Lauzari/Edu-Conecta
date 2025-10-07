import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxPagesToShow = 1;
  const pageNumbers = [];
  let lastNumber = 0;

  for (let number = 1; number <= totalPages; number++) {
    if (
      number === 1 ||
      number === totalPages ||
      (number >= currentPage - maxPagesToShow && number <= currentPage + maxPagesToShow)
    ) {
      pageNumbers.push(number);
      lastNumber = number;
    } else if (
      number === currentPage - maxPagesToShow - 1 ||
      number === currentPage + maxPagesToShow + 1
    ) {
      if (lastNumber !== "...") {
        pageNumbers.push("...");
        lastNumber = "...";
      }
    }
  }

  return (
    <BootstrapPagination>
      <BootstrapPagination.Prev
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      />
      {pageNumbers.map((number, idx) =>
        number === "..." ? (
          <BootstrapPagination.Ellipsis key={`ellipsis-${idx}`} disabled />
        ) : (
          <BootstrapPagination.Item
            key={`page-${number}`}
            active={number === currentPage}
            onClick={() => onPageChange(number)}
          >
            {number}
          </BootstrapPagination.Item>
        )
      )}
      <BootstrapPagination.Next
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      />
    </BootstrapPagination>
  );
}

export default Pagination;
