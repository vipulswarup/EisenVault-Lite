import React,{Fragment , useEffect , useState} from 'react';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia, faFile, faHdd } from "@fortawesome/free-solid-svg-icons";
import './DocumentList.scss';

import {getToken} from  "../../Utils/Common";
import ProfilePic from "../Avtar/Avtar";

import Search from "../SearchBar/SearchBar";
import IconBar from "../IconBar/IconBar";

import Modal from '../UI/Modal/Modal';
import ModalAdd from '../UI/Modal/ModalAdd';
import ModalTrash from '../UI/Modal/ModalTrash';
import useModal from '../UI/Modal/useModal';
import Pagination from '../Pagination/Pagination';

const DocumentsList = () => {
  let history = useHistory();
  const [ departments , setDepartments ] = useState([]);
  const [ documents , setDocuments ] = useState([]);
  
  const [ currentPage, setCurrentPage ] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/sites?skipCount=0&maxItems=100',
      {
        headers:
        {
          Authorization: `Basic ${btoa(getToken())}`
        }
        }).then((response) => {
      console.log(response.data)
      setDepartments(response.data.list.entries)
    });
  },[]);
const {isShowing: isShowing1,toggle: togglecreate} = useModal();
const {isShowing: isShowing2,toggle: toggleadd} = useModal();
const {isShowing: isShowing3,toggle: toggletrash} = useModal();

// Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = departments.slice(indexOfFirstPost, indexOfLastPost);

// Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber);

function handleDocumentLibrary(key){
  axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${key}/children?skipCount=0&maxItems=100`,
        {
          headers:
          {
            Authorization: `Basic ${btoa(getToken())}`
          }
          }).then((response) => {
        console.log(response.data)
        setDocuments(response.data.list.entries)
        documents.map(d => (
          d.entry.name === 'documentLibrary' ?  history.push(`/document/${d.entry.id}`)
          : null
        ) 
          )
      }).catch((error) => {
        console.log(error);
      }
      );
      
      
}

return (
  <Fragment>
  
      <Modal isShowing = {isShowing1} hide={togglecreate}/>
      <ModalAdd isShowing1 = {isShowing2} hide={toggleadd}/>
      <ModalTrash isShowing = {isShowing3} hide={toggletrash}/>

      <div id="second_section">
      <h2>Document List</h2>
        <Search />
        <ProfilePic />
        
            <div>
              <IconBar togglecreate= {togglecreate} 
                      toggleadd = {toggleadd}
                      toggletrash = {toggletrash}
              />
            </div>

      <ul className='files'>
      <h2>My Departments</h2>
          
           <table id="doc_list">
          {currentPosts.map(department => (
              <tbody key={department.entry.id}>
                  <tr className='details'>
                  <td className='fileicon'>
                  
                    <FontAwesomeIcon icon={faGlobeAsia} className="fas"/>
                    {department.entry.title}</td>

                    
                     <td className='fileDetails' onClick={() => handleDocumentLibrary(department.entry.guid)}>
                    Document Library
                    {document.folders} </td>

                    <td className='fileDetails'> 
                    <FontAwesomeIcon icon={faFile} className="fas"/>
                    {document.files} </td>

                    <td className='fileDetails'> 
                    <FontAwesomeIcon icon={faHdd} className="fas"/>
                    {document.size} </td>

                   </tr>
                </tbody>
          ))}
          </table> 
      </ul>

      </div>

      <div className="col-md-6">
      <Pagination
       postsPerPage={postsPerPage}
       totalPosts={departments.length}
       paginate={paginate}
        />
        </div>

  </Fragment>
      )
    };

export default DocumentsList;