import React , { Fragment,useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Search from "../../SearchBar/SearchBar";
import ProfilePic from "../../Avtar/Avtar";
import DocumentDetails from "../../MoreDetails/MoreDetails";
import "../DocumentViewer/DocumentViewer.scss"
import { Item } from '../../backButton/backButton';
import {getToken} from  "../../../Utils/Common";
import axios from 'axios';
import {MoreDetailToggleButton} from "../../MobileMenu/MobileMenu"

function DocPreview() {
    const [fileURI, setFileURI] = useState("");
    const [pdfFileURI, setPdfFileURI] = useState("");
    const[moreDetails,setMoreDetails]=useState(false);

    const [error, setError] = useState(null);
    let params = useParams();
    const title = params.title;
    const [dataType, setDataTypes] = useState("")
    const path = window.location.href; 
    console.log(path)
    const id =  path.slice(41,77)   
    const fileType = path.split('.').pop()
    console.log(fileType)

  useEffect(() => {
    //First find out content type
    axios.get(`https://cors-anywhere.herokuapp.com/https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/content`,
        {
          headers: {
            Authorization: `Basic ${btoa(getToken())}`,
         },
        }
      ).then((response) => {
        // setDataTypes(response.headers["content-type"])
        // console.log(dataType)
        setFileURI(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/content`)
      });
  }, [id]);

  let MoreDetailsHandler=()=>{
    setMoreDetails((prevState)=>{
      return {moreDetails: !prevState.moreDetails}
    })
  };

  function DisplayUsingOfficeApps() {
    var token = getToken();
    var url =
      "https://view.officeapps.live.com/op/embed.aspx?src=" +
      fileURI + "?alf_ticket=" +token;
    console.log(url);
    console.log(fileURI);
    console.log(token);
    // document.getElementById('myFrame').src=url
    return (
      <Fragment>
      {/* <MoreDetailToggleButton details={MoreDetailsHandler} /> */}
      <button onClick={()=>{setMoreDetails(true)}}>More</button>
      {setMoreDetails(true)? <DocumentDetails show={moreDetails}/>: null}
      <iframe src={url} 
      title='mydocframe' 
      id='mydocFrame'
      width="700px" height="700px">
      </iframe>
      </Fragment>
    );
  }

  useEffect(() => {axios.get(`https://cors-anywhere.herokuapp.com/https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/content?attachment=false`,    
   {headers:
    {
      Authorization: `Basic ${btoa(getToken())}`
    }}).then((response)=>{
        // setDataTypes(response.headers["content-type"])
        // console.log(dataType)

        // const file = new Blob([response.data],
        //     {type: dataType});
        
        setPdfFileURI(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/content?attachment=false`)
         })} , [id]) 

 const PdfViewer = () => {
  
        return (
          <Fragment>
          
          <div className="docFrame">
          <MoreDetailToggleButton details={MoreDetailsHandler} />
          <DocumentDetails/>

            <iframe src={pdfFileURI} 
            title='myframe' 
            id='myFrame'
            width="600px" 
            height="700px" 
            marginWidth="1rem"
            allowFullScreen/>
          </div>
          </Fragment>
        ); 
        
        //document.getElementById('myFrame').src=pdfPreviewUrl
    }
    
function Viewer() { 
  if (fileType === 'pdf') return PdfViewer() 
  else if (fileType === 'png') return PdfViewer()
  else return DisplayUsingOfficeApps()
}

return(
    <Fragment>
     <div id="second_section">
     <div className="top-menu">

        <h2>{title}</h2>
        <Search />
        <ProfilePic />
      </div>
      
        <Item />
        <Viewer />
        
    </div>
    </Fragment>
)
}

export default DocPreview;