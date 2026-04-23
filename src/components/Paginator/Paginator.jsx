  import React from "react";
import Pagination from "react-bootstrap/Pagination";

export const Paginator = ({ numPages = 0, currentPage = 1, onPress }) => {
  return (
    <Pagination>
      <Pagination.First
        onClick={() => onPress(1)}
        disabled={currentPage === 1}
      />

      <Pagination.Prev
        onClick={() => onPress(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {Array.from({ length: numPages }, (_, index) => (
        <Pagination.Item
          key={index}
          active={currentPage === index + 1}
          onClick={() => onPress(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => onPress(currentPage + 1)}
        disabled={currentPage === numPages}
      />

      <Pagination.Last
        onClick={() => onPress(numPages)}
        disabled={currentPage === numPages}
      />
    </Pagination>
  );
};