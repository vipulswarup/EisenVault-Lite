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
  

  const [ currentPage, setCurrentPage ] = useState(1);
  const [postsPerPage] = useState(10);

 //API CALL
 useEffect(()=>{
  axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/5ccc676b-0a0c-4f9f-b176-87a786b3b5d8/children?skipCount=0&maxItems=100', 
  {headers:{
    Authorization: `Basic ${btoa(getToken())}`
    }
  }).then((response) => {
  console.log(response.data)
  setFileState(response.data.list.entries)});
},[]); 

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
                    <th id="shared">Shared By</th>
                    <th id="shared">Shared On</th>
                    <th id="action">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  { currentPosts.map((d,i) => (
                    <tr  key={d.entry.id} id="first_details">
                    <td className="file_name-u">
                    <FontAwesomeIcon className="pdf-file fas fa-file-pdf" icon={faFilePdf}/> {d.entry.name}</td>
                    <td className="details-u-s">{d.entry.createdByUser.displayName}</td>
                    <td className="details-u-s">{d.entry.createdAt.split('T')[0]}</td>
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