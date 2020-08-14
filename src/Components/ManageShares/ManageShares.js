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
  {headers:{
    Authorization: `Basic ${btoa(getToken())}`
    }
  }).then((response) => {
    
  setFileState(response.data.list.entries)
  console.log(response.data.list.entries)
  response.data.list.entries.forEach(d=>{
      axios.get(`https://systest.eisenvault.net//alfresco/api/-default-/public/alfresco/versions/1/queries/nodes?term=${d.entry.name}&include=effectivity,departmentName,allowableOperations,properties,path`, 
      {headers:{
        Authorization: `Basic ${btoa(getToken())}`
        }
      }).then((response) => {
        console.log("received")
      console.log(response.data)
      
      setDetailsState(response.data.list.entries.map(d=>{
        console.log(d.entry.properties["cm:from"])
        return {
          EffectiveFrom:d.entry.properties["cm:from"],   
          EffectiveTo:d.entry.properties["cm:to"] }
      }))})
      .catch((error)=> console.log(error));
    }) 
}); 
},[])

 

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
                    <tr  id="first_details">
                    <td className="file_name-u">
                    <FontAwesomeIcon className="pdf-file fas fa-file-pdf" icon={faFilePdf}/> {d.entry.name}</td>
                    
                    {DetailsState.map(d => (
                      <tr>
                      <td className="details-u-s">{d.EffectiveFrom ? d.EffectiveFrom.split('T')[0]: null }</td>
                    <td className="details-u-s">{d.EffectiveTo ? d.EffectiveTo.split('T')[0] : null}</td>
                    </tr>
                    ))}
                  
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