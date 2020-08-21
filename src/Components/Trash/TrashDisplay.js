import React, { Fragment,useEffect,useState} from 'react';
import Modal from "../Modal/Modal";
import { DeleteSummmary,RestoreSummary } from "../Modal/DeleteModalSumm/DeleteSumm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import Search from '../SearchBar/SearchBar';
import '../MyUploads/MyUploads.scss';
import './TrashDisplay.scss';
import '../../Containers/styles.scss';
import { getToken } from '../../Utils/Common';
import ProfilePic from "../Avtar/Avtar";
import NestedToolTip from "../UI/popup";

function TrashDisplayFiles(props){
  const[TrashFileState,setTrashFileState]=useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const[deleting,deleteHandler]=useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [postsPerPage] = useState(10);
  const [ paginationDefualt, setPaginationDefault ] = useState([]);
  const [hasMoreItems , setMoreItems] = useState('');
  const [skipCount , setSkipCount ] = useState('');

  //API CALL
  useEffect(()=>{
    getDeletedData();
  },[]);

const getDeletedData=()=>{
  axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/deleted-nodes?skipCount=0&maxItems=10',
    {headers:{
    Authorization: `Basic ${btoa(getToken())}`
     }}).then((response) => {
      let FileData=response.data;
      console.log(FileData);
      setPaginationDefault(response.data.list.pagination)
      setTrashFileState(response.data.list.entries.map(d=>{
        return {
          select:false,
          id:d.entry.id,
          name:d.entry.name,
          createdOn:d.entry.createdAt.split('T')[0],
          archivedAt:d.entry.archivedAt.split('T')[0]
        }})) 
      }).catch(err=>alert(err));
};
// Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = TrashFileState.slice(indexOfFirstPost, indexOfLastPost);

// Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber);

const closeModal=()=>{ //function to close modal after performing it's operations
  return (setmodalIsOpen(false),
  deleteHandler(false)
  )
}
//function to collect nodeid of deleted files
const permanentDeleteByIds=()=>{
  TrashFileState.forEach(d=>{
    if(d.select){
    axios.delete(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/deleted-nodes/${d.id}`, 
    {headers:{
    Authorization: `Basic ${btoa(getToken())}`
     }
   }).then((response)=>{
        console.log(response.data);
        closeModal();
        getDeletedData();
      
         }).catch(err=>alert(err));
     };
    })}

//function to collect nodeid of restored files
const RestoreFileByIds=()=>{
  TrashFileState.forEach(d=>{
    if(d.select){
       axios.put(`https://systest.eisenvault.net/alfresco/s/api/archive/archive/SpacesStore/${d.id}`, {},
        {headers:
        {
          Authorization: `Basic ${btoa( getToken() )}`
        }
    }).then((response)=>{
          console.log(response.data);
          closeModal();
          getDeletedData();
          }).catch(err=>alert(err));
      };
      })}
      function next(){
  
        //  setSkipCount(skipCount + 10)
         console.log(skipCount);
         axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/deleted-nodes?skipCount=${skipCount}&maxItems=10`,
         {headers:{
           Authorization: `Basic ${btoa(getToken())}`
         }}).then((response) => {
          console.log(response.data)
           setMoreItems(response.data.list.pagination.hasMoreItems)
           if (response.data.list.pagination.hasMoreItems){
            setSkipCount(response.data.list.pagination.skipCount + 10)
           }
           else{
            setSkipCount(response.data.list.pagination.skipCount - 10)
           }
          });
       
      }
      
      function previous(){
        axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/deleted-nodes?skipCount=${skipCount}&maxItems=10`,
        {headers:{
          Authorization: `Basic ${btoa(getToken())}`
        }}).then((response) => {
            setMoreItems(response.data.list.pagination.hasMoreItems)
            if (response.data.list.pagination.skipCount > 0){
              setSkipCount(response.data.list.pagination.skipCount - 10)
            }
            else{
              setSkipCount(response.data.list.pagination.skipCount + 10)
            }
           });
       }
      
      

return(
    <Fragment>
         <div id="second_section">
            <h2>Trash</h2>
            <Search />
            <ProfilePic />
        <div className="filesUpload">
        <table id="doc_list">
          <tbody>
            <tr id="icons">
                <th id="icon01">
                  <input type="checkbox"
                  onChange={(e)=>{
                    let checked=e.target.checked;
                    setTrashFileState(TrashFileState.map((d)=>{
                      d.select=checked;
                      return d;
                    }));
                  }}/></th>
                <th id="item_name">Item Name</th>
                <th id="created">Created on</th> 
                <th id="deleted">Deleted on</th>
                 <th id="action-trash">

                   {/* <NestedToolTip restored={()=>{RestoreFileByIds()}}/> */}
                   <NestedToolTip restored={()=>{RestoreFileByIds()}} deleted={()=>{permanentDeleteByIds()}}/>
                      {/*  <label>Action </label>
                      <select id="action-t">
                        <option value="delete-a">Delete All</option>
                        <option value="delete-s">Delete Selected</option>
                        <option value="delete-a">Restore All</option>
                        <option value="delete-s">Restore Selected</option> 
                      </select> */}
                  </th>  

                  <Modal show={deleting}>
                  <DeleteSummmary deleted={()=>{permanentDeleteByIds()}} 
                  clicked={()=>{deleteHandler(false)}}/>
                  </Modal>
                  
                  <Modal show={modalIsOpen}>
                  <RestoreSummary deleted={()=>{RestoreFileByIds()}} 
                  clicked={() => setmodalIsOpen(false)}/>
                  </Modal>
                </tr>
                
                {currentPosts.map((d,i) => (
                 <tr  key={d.id} id="first_details">
                 <td className="file_icon1">
                   <input onChange={(event)=>{
                      let checked=event.target.checked;
                    setTrashFileState(TrashFileState.map((data)=>{
                      if(d.id===data.id){
                        data.select=checked;
                      }return data;
                    }));
                   }} type="checkbox" checked={d.select}
                    /> </td> 
                <td className="file_name_t">{d.name}</td>
                <td className="created_t">{d.createdOn}</td>                     
                <td className="deleted_t">{d.archivedAt}</td> 
                <td className="delete-icon">
                <FontAwesomeIcon icon={faTrash} className="TrashIcon" onClick={()=>{deleteHandler(true)}}/>
                <FontAwesomeIcon icon={faUndo} className="UndoIcon"  onClick={() => setmodalIsOpen(true)}/></td>           
            </tr>
                ))}
        </tbody>
      </table>
    </div>
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
  export default TrashDisplayFiles;