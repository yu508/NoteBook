import { useMemo } from "react";

export const usePagination = (totalPage, setCurrentPage) => {
  const pagesArray = useMemo(() => {
    let result = [];
    for (let i = 0; i < totalPage; i++) {
      result.push(i + 1);
    }
    return result;
  }, [totalPage]);

  const changePage = (page) => {
    setCurrentPage(page);

  };

  return [pagesArray, changePage];
};
