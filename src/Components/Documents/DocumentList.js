import React,{Fragment , useEffect , useState} from 'react';
// import {instance} from '../ApiUrl/endpointName.instatnce'
import { useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faGlobeAsia } from "@fortawesome/free-solid-svg-icons";
import './DocumentList.scss';
import axios from 'axios';
import {getUser,getToken} from  "../../Utils/Common";
import ProfilePic from "../Avtar/Avtar";
import {instance} from "../ApiUrl/endpointName.instatnce"
import Search from "../SearchBar/SearchBar";

import Modal from "../Modal/Modal";
import { CreateDepartment, DeleteDepartment} from "../Modal/DeleteModalSumm/DeleteSumm";
import Pagination from '../Pagination/Pagination';
import IconBar, {IconBarDelete} from '../IconBar/IconBar';

const DocumentsList = () => {
  const user = getUser();
  const [createmodalIsOpen, createsetmodalIsOpen] = useState(false);
  // const [editmodalIsOpen, editsetmodalIsOpen] = useState(false);
  const [deletemodalIsOpen, deletesetmodalIsOpen] = useState(false);
  const [ paginationDefualtDept, setPaginationDefaultDept ] = useState([]);

  let history = useHistory();
  const [ departments , setDepartments ] = useState([]);
  const [ documents , setDocuments ] = useState([]);
  
  const [ currentPage, setCurrentPage ] = useState(1);
  const [postsPerPage] = useState(10);

  const departmentTitle = useFormInput ('');
  const [hasMoreItems , setMoreItems] = useState('');
  const [skipCount , setSkipCount ] = useState('');

  useEffect(()=>{
    getDepartments();
  },[]);

  const getDepartments=()=>{
    axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/sites?where=(visibility='PRIVATE')&maxItems=10&skipCount=0`,
    {headers:
      {
        Authorization: `Basic ${btoa(getToken())}`
      }}).then((response) => {
      console.log(response.data)
      setDepartments(response.data.list.entries)
      setPaginationDefaultDept(response.data.list.pagination)
      setMoreItems(response.data.list.pagination.hasMoreItems) 
      setSkipCount(response.data.list.pagination.skipCount + 10)
      console.log(response.data.list.pagination)     
    });
  }

// Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = departments.slice(indexOfFirstPost, indexOfLastPost);

// Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber);

function handleDocumentLibrary(key){

  instance.get(`/nodes/${key}/children`
  ).then((response) => {
        console.log(response.data)
        setDocuments(response.data.list.entries)
        
        response.data.list.entries.map(d => (
          d.entry.name === 'documentLibrary' ?  history.push(`/document/${d.entry.id}`)
          : null
        ) 
          )
      }).catch((error) => {
        console.log(error);
      })     
}

function handleCreateDepartment(){
  instance.post('/sites',
  {
   title: departmentTitle.value , visibility: "PUBLIC"
  }).then(response => {
    alert("Department successfully created");
    getDepartments()
    console.log(response)
  }).catch(error => {
    if (error.response.status===409){
      alert("Department with this name already exists");
    }
    console.log(error)
});
createsetmodalIsOpen(false)
}

function handleDeleteDepartment(id){
  instance.delete(`/sites/${id}?permanent=false`
  ).then(response => {
    alert("Department successfully deleted");
    getDepartments()
    console.log(response)
  }).catch(error => {
    if (error.response.status===404){
      alert("Department does not exist");
    }
    console.log(error)
});
}

function next(){
  
  //  setSkipCount(skipCount + 10)
   console.log(skipCount);
   instance.get(`/sites?where=(visibility='PRIVATE')&maxItems=10&skipCount=${skipCount}`
   ).then((response) => {
    console.log(response.data)
    setDepartments(response.data.list.entries)
    setPaginationDefaultDept(response.data.list.pagination) 
    console.log(response.data.list.pagination)
     setMoreItems(response.data.list.pagination.hasMoreItems)
     if (response.data.list.pagination.hasMoreItems){
      setSkipCount(response.data.list.pagination.skipCount + 10)
     }
     else{
      setSkipCount(response.data.list.pagination.skipCount - 10)
     }
     console.log(response.data.list.entries)
     console.log(response.data.list.pagination.skipCount)
   });
 
}

function previous(){
  instance.get(`/sites?where=(visibility='PRIVATE')&maxItems=10&skipCount=${skipCount}`
  ).then((response) => {
   console.log(response.data)
   setDepartments(response.data.list.entries)
   setPaginationDefaultDept(response.data.list.pagination) 
      setMoreItems(response.data.list.pagination.hasMoreItems)
      if (response.data.list.pagination.skipCount > 0){
        setSkipCount(response.data.list.pagination.skipCount - 10)
      }
      else{
        setSkipCount(response.data.list.pagination.skipCount + 10)
      }
     
      console.log(response.data.list.entries)
      console.log(response.data.list.pagination)
      console.log(response.data.list.pagination.skipCount)
    });
 }

return (
  <Fragment>
    <div id="second_section">
      <h2>Document List</h2>
        <Search />
        <ProfilePic />

            <div>
            <Modal show={createmodalIsOpen}>
            <CreateDepartment createDept={handleCreateDepartment} 
            clicked={() => createsetmodalIsOpen(false)} 
            departmentTitle={departmentTitle}/>
            </Modal>
              <IconBar 
                toggleadd = {() =>{createsetmodalIsOpen(true)}}
              />
            </div>

      <ul className='files'>
          
           <table id="doc_list">
          {currentPosts.map(department => (
              <tbody key={department.entry.id}>
                  <tr className='details'>
                  <td className='fileicon'>
                  
                    <FontAwesomeIcon icon={faGlobeAsia} className="fas"/>
                    {department.entry.title}</td>


                    <td className='fileDetails' 
                    onClick={() => handleDocumentLibrary(department.entry.guid)}>
                    Document Library
                    {document.folders} </td>

                    <td>
                      { user === 'admin' && 
                      <Modal show={deletemodalIsOpen}>
                          <DeleteDepartment 
                            clicked={() => deletesetmodalIsOpen(false)}>
                          </DeleteDepartment>
                          <DeleteDepartment  clicked={() => deletesetmodalIsOpen(false)}></DeleteDepartment>
                        </Modal> &&
                      <div>
                        <FontAwesomeIcon icon={faTrashAlt} onClick={(e) => { if (window.confirm(`Are you sure you wish to delete ${department.entry.title}`))
                        handleDeleteDepartment(department.entry.id)} }
                        className="icon-item delete"/>
                      </div>
  
                      }
                      
                    </td>
                   </tr>
                </tbody>
          ))}
          </table> 
      </ul>

      </div>

      <div className="col-md-6">
      <Pagination
       handlePrev={previous}
       handleNext={next}
       hasMoreItems={hasMoreItems}
       skipCount={skipCount-10}
        />
        </div>

  </Fragment>
      )
    }

    const useFormInput = initialValue => {
      const [value, setValue] = useState(initialValue);
     
      const handleChange = e => {
        setValue(e.target.value);
      }
      return {
        value,
        onChange: handleChange
      }
    }

export default DocumentsList;