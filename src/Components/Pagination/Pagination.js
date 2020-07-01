import React from "react";
import SimpleReactPaginate from "simple-react-paginate";
import "./stylePagination.scss";

const Pagination = () => (
  <div className="content">
    <div className="list">
      <SimpleReactPaginate
        current={10}
        total={20}
        pageRange={2}
        marginRange={1}
        previousLabel="Prev"
        nextLabel="Next"
        containerClass="style-1"
      />
    </div>
    
  </div>
);

export default Pagination;