import React , { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Search from "../../SearchBar/SearchBar";
import ProfilePic from "../../Avtar/Avtar";
import FileViewer from 'react-file-viewer';

const PdfViewer = () =>{
    let params = useParams();
    //const id = params.id;
    const name = params.name;
    // let type = name.slice(name.lastIndexOf('.')+1);
    let type = 'png'
    alert(type);
    const path = window.location.pathname;

    function onError(e) {
        alert(e,'error in file-viewer');
    }

    return(
        <Fragment>
         <div id="second_section">
            <h2>{name}</h2>
            <Search />

            <ProfilePic />

        <h1>This will hold our content</h1>
        <FileViewer 
            fileType = {type}
            filePath = {path}
            onError = {onError}/>
        </div>
        </Fragment>
    )
}

export default PdfViewer;