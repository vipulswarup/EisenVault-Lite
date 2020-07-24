import React, {useEffect,useState,Fragment} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf,faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import Search from "../../SearchBar/SearchBar";
import {getToken} from  "../../../Utils/Common";
import ProfilePic from "../../Avtar/Avtar";
import Pagination from '../../Pagination/Pagination';

function Document(){
  const[documents,setDocuments]=useState([]);
   let params = useParams();
   const nodeId = params.nodeId;
   const title = params.title;

   const [ currentPage, setCurrentPage ] = useState(1);
   const [postsPerPage] = useState(10);
 
  useEffect(()=>{
        axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${nodeId}/children?skipCount=0&maxItems=100`,
        {
          headers:
          {
            Authorization: `Basic ${btoa(getToken())}`
          }
          }).then((response) => {
        console.log(response.data)
        setDocuments(response.data.list.entries)
      }).catch((error) => {
        console.log(error);
      }
      );
    },[nodeId]);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = documents.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return( 
      <Fragment>
         <div id="second_section">
          <h2>{title}</h2>
          {/* <h2>{data.location.state.data.title}</h2> */}
            <Search />

            <ProfilePic /> 
                
              <div className="filesShared">
                <table id="doc_list">
                  <thead>
                  <tr id="icons">
                    <th id="item-names">Item Name</th>
                    <th id="shared">Created By</th>
                    <th id="shared">Created On</th>
                    <th id="shared">Modified On</th>
                    <th id="action">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  { currentPosts.map((d,i) => (
                    <tr  key={d.id} id="first_details">
                    <td className="file_name-u">
                    <Link to={{pathname:`/document/${d.entry.name}/${d.entry.id}`}}>
                    <FontAwesomeIcon className="pdf-file fas fa-file-pdf" icon={faFilePdf}/> {d.entry.name}</Link></td>
                    <td className="details-u-s">{d.entry.createdByUser.displayName}</td>
                    <td className="details-u-s">{d.entry.createdAt.split('T')[0]}</td>
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
    </Fragment>

          )
          }

export default Document;