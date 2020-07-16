import React, { useState } from "react";
import "./stylePagination.scss";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isActive, setActive] = useState(false)

    const pageNumbers = [];

    const prevPage = (currentPage-1)
    const nextPage = (currentPage+1)
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className='pagination'>
        {pageNumbers.includes(prevPage) && 
        <a onClick={() => {
                    setCurrentPage(prevPage);
                    paginate(prevPage);
                    setActive( prevPage );

                }}
            className={isActive === prevPage ? 'pageItem activeState' : 
              !isActive === prevPage ? 'pageItem inActiveState' : "pageItem"}>               
                    Prev
                </a>
            }

           {pageNumbers.map(number => (
            <li key={number} 
            onClick={() => {
              setCurrentPage(number)
              paginate(number)
              setActive( number );
            }}
            className={isActive === number ? 'pageItem activeState' : 
            !isActive === number ? 'pageItem inActiveState' : "pageItem"}>               
            {number}
            </li>
          ))} 

      {pageNumbers.includes(nextPage) && 
        <a onClick={() => {
                    setCurrentPage(nextPage);
                    paginate(nextPage);
                    setActive( nextPage );
                }}
              className={isActive === nextPage ? 'pageItem activeState' : 
              !isActive === nextPage ? 'pageItem inActiveState' : "pageItem"}>               
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