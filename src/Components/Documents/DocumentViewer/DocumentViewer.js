import React , { Fragment,useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Search from "../../SearchBar/SearchBar";
import ProfilePic from "../../Avtar/Avtar";
import {instance} from '../../ApiUrl/endpointName.instatnce'
import { Item } from '../../backButton/backButton';
import {getToken} from  "../../../Utils/Common";
import axios from 'axios';

function DocPreview() {
    const [fileURI, setFileURI] = useState("");
    const [error, setError] = useState(null);
    let params = useParams();
    const title = params.title;
    const [dataType, setDataTypes] = useState("")
    const path = window.location.href; 
    console.log(path)
    const id =  path.slice(41,77)   
    const fileType = path.split('.').pop()
    console.log(fileType)
  
 const PdfViewer = () => {instance.get(`/nodes/${id}`,    
   {headers:
    {
      Authorization: `Basic ${btoa(getToken())}`
    }}).then((response)=>{
        setDataTypes(response.headers["content-type"])
        console.log(dataType)

        // const file = new Blob([response.data],
        //     {type: dataType});
        
        let pdfPreviewUrl = `https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/content?attachment=false`
        
        console.log(pdfPreviewUrl)      
        document.getElementById('myFrame').src=pdfPreviewUrl
    })}

  useEffect(() => {
      //First find out content type
      axios.get(`https://cors-anywhere.herokuapp.com/https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/renditions/pdf/content?attachment=false`,
          {
            headers: {
              Authorization: `Basic ${btoa(getToken())}`,
            },
          }
        )
        .then((response) => {
          // setDataTypes(response.headers["content-type"])
          // console.log(dataType)
          setFileURI(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/renditions/pdf/content?attachment=false`)
        });
    }, [id]);

    function DocumentPreview() {           
      document.getElementById('myFrame').src=fileURI
  }

function DocuementRenditions () {(instance.post(`/nodes/${id}/renditions`,
{"id":"pdf"},
{headers:
    {
      Authorization: `Basic ${btoa(getToken())}`
    }}).then((response)=>{
              console.log(response)
}))}

function CreatePdfPreview() {instance.get(`/nodes/${id}/renditions/pdf`,
{headers:
    {
      Authorization: `Basic ${btoa(getToken())}`
    }})
.then((response)=>{
    console.log(response.data.entry.status)
    if (response.data.entry.status === "CREATED") 
    { return (DocumentPreview())}
    else {return DocuementRenditions()}
})}
    
(fileType === 'pdf') ? PdfViewer() : (fileType === 'png') 
? PdfViewer() : CreatePdfPreview()

return(
    <Fragment>
     <div id="second_section">
        <h2>{title}</h2>
        <Search />
        <ProfilePic />
        <Item />
        <iframe                  
        {...error && <>
        <small style={{ color: 'red' }}>{error}</small><br /></>}
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