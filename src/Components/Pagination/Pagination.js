import React, { useState } from "react";
import "./stylePagination.scss";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [currentPage, setCurrentPage] = useState(0)

    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className='pagination'>
        {pageNumbers.includes(currentPage - 1) && 
        <a onClick={() => {
                    setCurrentPage(currentPage - 1);
                    paginate(currentPage - 1);
                }}
                className='prevButton'>
                    Prev
                </a>
            }

          {pageNumbers.map(number => (
            <li key={number} 
            className='pageItem'
            onClick={() => paginate(number)}>                
            {number}
            </li>
          ))}

      {pageNumbers.includes(currentPage + 1) && 
        <a onClick={() => {
                    setCurrentPage(currentPage + 1);
                    paginate(currentPage + 1);
                }}
                className='nextButton'>
                    Next
                </a>
            }
        </ul>
      </nav>
    );
  };

// const Pagination = () => (
// <Fragment>
//   <div className="content">
//     <div className="list">
//       <SimpleReactPaginate
//         current={1}
//         total={20}
//         pageRange={2}
//         marginRange={1}
//         previousLabel="Prev"
//         nextLabel="Next"
//         containerClass="style-1"
//       />
//     </div>
    
//   </div>
// </Fragment>
// );

export default Pagination;