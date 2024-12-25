import React from 'react';
import "./Pagination.scss";

const Pagination = ({ totalPage, setCurrentPage, currentPage }) => {
  return (
      <div className="page__wrapper">
        {[...Array(totalPage)].map((_, index) => {
          const page = index + 1; // Нумерація з 1
          return (
              <span
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? 'page page__current' : 'page'}
              >
            {page}
          </span>
          );
        })}
      </div>
  );
};

export default Pagination;
