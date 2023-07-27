import React, { useState } from "react";
import "./style.scss";
import { Pagination } from "react-bootstrap";
import Arrowleft from "../../assests/images/dashborad/arrow-left.png";
import Arrowright from "../../assests/images/dashborad/arrow-right.png";

function Index() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20; // Replace this with the total number of pages in your data
  const visiblePages = 3; // Number of visible pagination items (excluding ellipsis)

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      handlePageClick(currentPage + 1);
    }
  };
  const handlePrev = () => {
    if (currentPage !== 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const generatePaginationItems = () => {
    const paginationItems = [];

    // Function to add a range of pages to paginationItems
    const addPagesRange = (start, end) => {
      for (let page = start; page <= end; page++) {
        paginationItems.push(
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </Pagination.Item>
        );
      }
    };

    // Add the first page
    paginationItems.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => handlePageClick(1)}
      >
        1
      </Pagination.Item>
    );

    // Calculate the start and end of the visible page range
    let start = Math.max(2, currentPage - Math.floor(visiblePages / 2));
    let end = Math.min(totalPages - 1, start + visiblePages - 1);

    // Add an ellipsis if there are more pages before the visible range
    if (start > 2) {
      paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }

    // Add the visible range of pages
    addPagesRange(start, end);

    // Add an ellipsis if there are more pages after the visible range
    if (end < totalPages - 1) {
      paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }

    // Add the last page
    if (totalPages > 1) {
      paginationItems.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return paginationItems;
  };

  return (
    <div>
      <Pagination>
        <Pagination.Prev className="prev-li" onClick={handlePrev}>
          <img src={Arrowleft} className="pe-2" alt="Previous" />
          Previous
        </Pagination.Prev>

        {generatePaginationItems()}

        <Pagination.Next className="next-li" onClick={handleNext}>
          Next
          <img src={Arrowright} className="ps-2" alt="Next" />
        </Pagination.Next>
      </Pagination>
    </div>
  );
}

export default Index;
