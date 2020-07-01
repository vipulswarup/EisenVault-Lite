import React from "react";

import ReactSearchBox from "react-search-box";
import "./styleSearchBar.scss";

 const Search = () => {
  const data = [
    {
      key: "pdf-1",
      value: "Data.pdf"
    },
    {
      key: "pdf",
      value: "Sample2.pdf"
    },
    {
      key: "pdf-3",
      value: "Example.pdf"
    },
    {
      key: "doc1",
      value: "Abc.docx"
    },
    {
      key: "doc",
      value: "Document.docs"
    }
  ];

    return (
      <div className="container">
          
          <ReactSearchBox
            inputBoxHeight= '1rem'
            inputBoxBorderColor= 'transparent'
            dropDownHoverColor= '#ccc'
            dropDownBorderColor= 'transparent'
            placeholder="Start typing to search your documents"
            value=""
            data={data}
          /> 
    </div>
    );
  }

export default Search;
