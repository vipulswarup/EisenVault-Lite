import React, {useEffect,useState,Fragment} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf,faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import ProfilePic from "../Avtar/Avtar";
import axios from 'axios';
import './ManageShares.scss'
import Search from "../SearchBar/SearchBar";
import { getToken } from '../../Utils/Common';
import Pagination from '../Pagination/Pagination';

function ManageShares(){
  const[FileState,setFileState]=useState([]);
  const[DetailsState,setDetailsState]=useState([]);

  const [ currentPage, setCurrentPage ] = useState(1);
  const [postsPerPage] = useState(10);

 //API CALL
 
function getData(){

}


 useEffect(()=>{

  axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/shared-links?include=properties', 

  axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/5ccc676b-0a0c-4f9f-b176-87a786b3b5d8/children?skipCount=0', 

  {headers:{
    Authorization: `Basic ${btoa(getToken())}`
    }
  }).then((response) => {
    
  setFileState(response.data.list.entries)
FileState.forEach(d=>{
    axios.get(`https://systest.eisenvault.net//alfresco/api/-default-/public/alfresco/versions/1/queries/nodes?term=${d.entry.name}&include=effectivity,departmentName,allowableOperations,properties,path`, 
    {headers:{
      Authorization: `Basic ${btoa(getToken())}`
      }
    }).then((response) => {
      console.log("received")
    console.log(response.data)
    setDetailsState(response.data.list.entries.map(d=>{
      return {
        EffectiveFrom:d.entry.properties["cm:from"]    }
    }))})
    .catch((error)=> console.log(error));
  })
  console.log(response.data.list.entries)
   //getDetailsData();
})); 
}

,[]); 

// function getDetailsData() {
//   FileState.forEach(d=>{
//   axios.get(`https://systest.eisenvault.net//alfresco/api/-default-/public/alfresco/versions/1/queries/nodes?term=${d.entry.name}&include=effectivity,departmentName,allowableOperations,properties,path`, 
//   {headers:{
//     Authorization: `Basic ${btoa(getToken())}`
//     }
//   }).then((response) => {
//     console.log("received")
//   console.log(response.data)
//   setDetailsState(response.data.list.entries.map(d=>{
//     return {
//       EffectiveFrom:d.entry.properties["cm:from"]    }
//   }))})
//   .catch((error)=> console.log(error));
// })
//  }


// Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = FileState.slice(indexOfFirstPost, indexOfLastPost);

// Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber);

return( 
      <Fragment>
       
         <div id="second_section">
            <h2>Manage Shares</h2>
            <Search />
            <ProfilePic />
            
              <div className="filesShared">
                <table id="doc_list">
                  <thead>
                  <tr id="icons">
                    <th id="item-names">Item Name</th>
                    <th id="shared">Effective From</th>
                    <th id="shared">Effective To</th>
                    <th id="action">Department Name</th>
                  </tr>
                  </thead>
                  <tbody>
                  { FileState.map((d,i) => (
                    <tr  key={d.entry.id} id="first_details">
                    <td className="file_name-u">
                    <FontAwesomeIcon className="pdf-file fas fa-file-pdf" icon={faFilePdf}/> {d.entry.name}</td>
                    
                  <td className="details-u-s">{d.EffectiveFrom}</td>
                    <td className="details-u-s">{d.entry.modifiedAt.split('T')[0]}</td>
                    <td className="delete-u-s">
                    <FontAwesomeIcon className="fas fa-times-circle" icon={faTimesCircle} 
                       />
                  </td>
                  </tr>
                  ) )}
                </tbody>
              </table>
            </div>
            </div>

      <div className="col-md-6">
      <Pagination
       postsPerPage={postsPerPage}
       totalPosts={FileState.length}
       paginate={paginate}
        />
      </div>
    </Fragment>

          )
          }

export default ManageShares;