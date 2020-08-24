import React, {useEffect,useState,Fragment} from 'react';
import { useParams , useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Item } from '../../backButton/backButton';
// import axios from 'axios'

import { faFile,faTimesCircle,faFolder} from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../Pagination/Pagination';
import {instance} from '../../ApiUrl/endpointName.instatnce'
import Search from "../../SearchBar/SearchBar";
import ProfilePic from "../../Avtar/Avtar";
import {getToken} from "../../../Utils/Common"
import './SubDocument.scss';
function SubDocument(){
  let history = useHistory();
  const[documents,setDocuments]=useState([]);
  const [ paginationDefualtDoc, setPaginationDefaultDoc ] = useState([]);

  let params = useParams();
  const id = params.id;
  const [ currentPage, setCurrentPage ] = useState(1);
  const [postsPerPage] = useState(10);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = documents.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const getData = () => {
    axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/children?skipCount=0`,
    {headers:
      {
        Authorization: `Basic ${btoa(getToken())}`
      }}).then((response) => {
    console.log(response.data)
    setDocuments(response.data.list.entries)
    setPaginationDefaultDoc(response.data.list.pagination) 
    console.log(response.data.list.pagination)
    })
  };


   useEffect(()=>{
    getData()
  },[id]);
  

const handleDelete=(id,name)=>{
      axios.delete(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}`, 
      {headers:{
      Authorization: `Basic ${btoa(getToken())}`
       }
     }).then((data)=>{
          console.log(data);
          getData();
           }).catch(err=>alert(err));
      }
    

    function handleDocument(file , id, title){
      file ? history.push(`/document-details/${id}/${title}`): history.push(`/document/${id}`)
    }

    return( 
      <Fragment>
         <div id="second_section">
            <h2>Document Library</h2>
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
                    <th>Actions</th>
                    <th id="action"><Item /></th>
                  </tr>
                  </thead>
                  { currentPosts.map((d) => (
                  <tbody key={d.id}>
                    <tr id="first_details">
                    <td className="file_name-u" 
                    onClick={() => handleDocument(
                      d.entry.isFile,
                      d.entry.id,
                      d.entry.name)}>
                      <FontAwesomeIcon 
                      className="pdf-file fas fa-file-pdf" 
                        icon={d.entry.isFile ? faFile : faFolder} 
                          />
                       {d.entry.name}</td>
                    <td className="details-u-s">{d.entry.createdByUser.displayName}</td>
                    <td className="details-u-s">{d.entry.createdAt.split('T')[0]}</td>
                    <td className="details-u-s">{d.entry.modifiedAt.split('T')[0]}</td>
                    <td className="delete-u-s">
                    <FontAwesomeIcon className="fas fa-times-circle" icon={faTimesCircle}
                    onClick={(e) => { if (window.confirm(`Are you sure you wish to delete ${d.entry.name}`)) 
                    HandleDelete(d.entry.id,d.entry.name) }} />
                  </td>
                  </tr>
                </tbody>
                ) )}
              </table>
            </div>
            </div>
      <div className="col-md-6">
      <Pagination
       postsPerPage={postsPerPage}
       totalPosts={paginationDefualtDoc.count}
       paginate={paginate}
        />
        </div>
    </Fragment>
          )
    }
export default SubDocument;