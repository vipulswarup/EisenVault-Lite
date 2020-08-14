import React , { Fragment,useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Search from "../../SearchBar/SearchBar";
import ProfilePic from "../../Avtar/Avtar";
import axios from 'axios';
import { Item } from '../../backButton/backButton';

import { getToken } from "../../../Utils/Common";

function DocPreview() {
    const [error, setError] = useState(null);
    const [childId, setChildId] = useState([])
    let params = useParams();
    const title = params.title;

    const path = window.location.href; 

    // console.log(path)
    const id =  path.slice(41,77)   

    let fileURL;

    useEffect(() => {

    axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/children`,
    {headers:{
        Authorization: `Basic ${btoa(getToken())}`
      }}).then((response) => {
        //   let child = response.data.list
        //   console.log(child)

        setChildId(response.data.list.entries.map(d=>{
            return{
                childNode: d.entry.id
            }
        })) 
    });
},[id])

childId.forEach(d=>{ axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${d.childNode}/content?attachment=false`,
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
        
        document.getElementById('myFrame').src=fileURL
        console.log(response)
    }).catch((error) => {
        if (error.response.status === 401) 
        setError(error.response.data.message);
        else 
        setError("File preview not available");
        }
        );
    })

    return(
        <Fragment>
         <div id="second_section">
            <h2>{title}</h2>
            <Search />

            <ProfilePic />
        <Item />
        
        <iframe                  
        {...error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
        title='myframe' 
            id='myFrame'
            src = ""
            allowFullScreen
            height = "700px"
            width = "700px"
            /> 
        </div>
        </Fragment>
    )
  }

export default DocPreview;