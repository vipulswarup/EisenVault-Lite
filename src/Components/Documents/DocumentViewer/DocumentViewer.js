import React , { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Search from "../../SearchBar/SearchBar";
import Avatar from "react-avatar";
import FileViewer from 'react-file-viewer';

const PdfViewer = () =>{
    let params = useParams();
    //const id = params.id;
    const name = params.name;
    let type = name.slice(name.lastIndexOf('.')+1);
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

            <Avatar className='avtarStyle'
                color='#E07050' size='3rem'
                round 
                name="Shayane Basu" /> 
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