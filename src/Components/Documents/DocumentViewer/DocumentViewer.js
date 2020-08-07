import React , { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Search from "../../SearchBar/SearchBar";
import ProfilePic from "../../Avtar/Avtar";
import Iframe from 'react-iframe';
// import FileViewer from 'react-file-viewer';
import axios from 'axios';
import { getToken } from "../../../Utils/Common";

// import axios from 'axios';
// import { getToken } from "../../../Utils/Common";

// function DocPreview() {
//     let params = useParams();
//     const name = params.name;

//     const path = window.location.href;
//     const id =  path.slice(28, 64)   

//     axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/content?attachment=true`,
//     { responseType: "stream" },
//     {headers:{
//       Authorization: `Basic ${btoa(getToken())}`
//     }}).then((response) => {
//      const doc = window.open(response)
//     });

//     return(
//         <Fragment>
//          <div id="second_section">
//             <h2>{name}</h2>
//             <Search />

//             <ProfilePic />

//             {/* <FileViewer 
//             fileType = {type}
//             filePath = {src}
//             onError = {onError}/> */}
        
//         {doc.map(d=><Iframe 
//         title='myframe' 
//             id='myFrame'
//             src = {id}
//             // src = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
//             height = "700px"
//             width = "700px"
//         /> )}
//         </div>
//         </Fragment>
//     )
//   }

const PdfViewer = () =>{
    let params = useParams();
    //const id = params.id;
    const name = params.name;
    // let type = name.slice(name.lastIndexOf('.')+1);
    // console.log(type);
    // const path = window.location.href;
    // const src = "https://systest.eisenvault.net/share/page/site/eisenvault-lite/document-details"
    // +'?'+'nodeRef=workspace://SpacesStore/'+path.slice(28, 64)

    return(
        <Fragment>
         <div id="second_section">
            <h2>{name}</h2>
            <Search />

            <ProfilePic />

            {/* <FileViewer 
            fileType = {type}
            filePath = {src}
            onError = {onError}/> */}
        
        <Iframe 
        title='myframe' 
            id='myFrame'
            // src = {doc}
            src = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            height = "700px"
            width = "700px"
            /> 
        </div>
        </Fragment>
    )
}

export default PdfViewer;