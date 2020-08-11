import React , { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Search from "../../SearchBar/SearchBar";
import ProfilePic from "../../Avtar/Avtar";
import axios from 'axios';
import { getToken } from "../../../Utils/Common";

// import axios from 'axios';
// import { getToken } from "../../../Utils/Common";

function DocPreview() {
    let params = useParams();
    const name = params.name;

    const path = window.location.href;
    const id =  params.id  
    let fileURL;

    axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/content?attachment=false`,
    {responseType:'blob',
    headers:{
      Authorization: `Basic ${btoa(getToken())}`
    }}).then((response) => {
        const dataTypes = (response.headers["content-type"])
        console.log(dataTypes)

        const file = new Blob([response.data],
            {type: dataTypes});
        
        fileURL = URL.createObjectURL(file);
        console.log(fileURL)

        dataTypes === "application/msword;charset=UTF-8" ? 
        document.getElementById('myFrame').src=`https://view.officeapps.live.com/op/embed.aspx?src=${fileURL}`
        : document.getElementById('myFrame').src=fileURL
     console.log(response)
    });

    return(
        <Fragment>
         <div id="second_section">
            <h2>{name}</h2>
            <Search />

            <ProfilePic />
        
        <iframe 
        title='myframe' 
            id='myFrame'
            src = ""
            height = "700px"
            width = "700px"
        /> 
        </div>
        </Fragment>
    )
  }

export default DocPreview;