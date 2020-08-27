import React, { useState } from "react";
import "./stylePagination.scss";

// const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isActive, setActive] = useState(false)

//     const pageNumbers = [];

//     const prevPage = (currentPage-1)
//     const nextPage = (currentPage+1)
  
//     for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//       pageNumbers.push(i);
//     }
    
//     return (
//       <nav>
//         <ul className='pagination'>
//         {pageNumbers.includes(prevPage) && 
//         <button onClick={() => {
//                     setCurrentPage(prevPage);
//                     paginate(prevPage);
//                     setActive( prevPage );
//                 }}
//             className={isActive === prevPage ? 'pageItem activeState' : 
//               !isActive === prevPage ? 'pageItem inActiveState' : "pageItem"}>               
//                     Prev
//           </button>
//         }

//            {/* {pageNumbers.map(number => (
//             <li key={number} 
//             onClick={() => {
//               setCurrentPage(number)
//               paginate(number)
//               setActive( number );
//             }}
//             className={isActive === number ? 'pageItem activeState' : 
//             !isActive === number ? 'pageItem inActiveState' : "pageItem"}>               
//             {number}
//             </li>
//           ))}  */}

//       {pageNumbers.includes(nextPage) && 
//         <button onClick={() => {
//                     setCurrentPage(nextPage);
//                     paginate(nextPage);
//                     setActive( nextPage );
//                 }}
//               className={isActive === nextPage ? 'pageItem activeState' : 
//               !isActive === nextPage ? 'pageItem inActiveState' : "pageItem"}>               
//                      Next
//           </button>
//             } 
//         </ul>
//       </nav>
//     );
//   };

const Pagination = (props) => {
  return (
    <nav>
        {/* <ul className='pagination'>
        <button onClick={props.handlePrev} className={(props.skipCount<0) ? "pageItem" :"activeState"} >
          Prev
        </button>
        <button onClick={props.handleNext} className={(props.hasMoreItems) || (props.Count<50) ? 'activeState' : "pageItem" }>
          Next
        </button>

        </ul> */}
         <ul className='pagination' >
        <button onClick={props.handlePrev} id="myprevBtn"  >
          Prev
        </button>
        <button onClick={props.handleNext} id="myBtn">
          Next
        </button>

        </ul>
    </nav>
  )
} 

export default Pagination;