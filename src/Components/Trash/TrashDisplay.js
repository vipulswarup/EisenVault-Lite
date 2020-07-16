import React, { Fragment,useEffect,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Search from '../SearchBar/SearchBar';
import '../MyUploads/MyUploads.scss';
import './TrashDisplay.scss';
import '../../Containers/styles.scss';
import useModal from '../UI/Modal/useModal';
import RestoreFile from '../UI/Modal/RestoreFile';
import DeleteModal from '../UI/Modal/DeleteModal';
import { getToken } from '../../Utils/Common';
import ProfilePic from "../Avtar/Avtar";
import NestedToolTip from "../UI/popup";
import Pagination from '../Pagination/Pagination';

function TrashDisplayFiles(props){
  const[TrashFileState,setTrashFileState]=useState([]);
  const {isShowing: isShowing1,toggle: deleteT} = useModal();
  const {isShowing:isShowing2,toggle:RestoreT}=useModal();

  const [ currentPage, setCurrentPage ] = useState(1);
  const [postsPerPage] = useState(10);

//API CALL
useEffect(()=>{
  getDeletedData();
},[]);
const getDeletedData=()=>{
  axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/deleted-nodes',
  {headers:{
    Authorization: `Basic ${btoa(getToken())}`
     }}).then((response) => {
      let FileData=response.data;
      console.log(FileData);
      setTrashFileState(response.data.list.entries.map(d=>{
        return {
          select:false,
          id:d.entry.id,
          name:d.entry.name,
          createdOn:d.entry.createdAt.split('T')[0],
          archivedAt:d.entry.archivedAt.split('T')[0]
        }
      })) 
      }).catch(err=>alert(err));
};
//function to collect noeid of deleted files
const deletedFileNodeIds=()=>{
  let DeletedFileIds=[];//array storing id's
  TrashFileState.forEach(d=>{
      if(d.select){
        DeletedFileIds.push(d.id);
      }
    });
}
    console.log(response.data)
    setTrashFileState(response.data.list.entries)
  }).catch((error) => {
    console.error(error)
  });
  },[]);

// Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = TrashFileState.slice(indexOfFirstPost, indexOfLastPost);

// Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber);


return(
    <Fragment>
         <DeleteModal isShowing = {isShowing1} hide={deleteT}/>
         <RestoreFile isShowing={isShowing2} hide={RestoreT}/>
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
                    setTrashFileState(currentPosts.map((d)=>{
                      d.select=checked;
                      return d;
                    }));
                  }}/></th>
                <th id="item_name">Item Name</th>
                <th id="created">Created</th> 
                <th id="deleted">Deleted</th>
                 <th id="action-trash">
                   <NestedToolTip/>
                      {/*  <label>Action </label>
                      <select id="action-t">
                        <option value="delete-a">Delete All</option>
                        <option value="delete-s">Delete Selected</option>
                        <option value="delete-a">Restore All</option>
                        <option value="delete-s">Restore Selected</option> 
                      </select> */}
                  </th>            
                </tr>
                
                {TrashFileState.map((d,i) => (
                 <tr  key={d.id} id="first_details">
                {currentPosts.map((d,i) => (
                 <tr  key={d.entry.id} id="first_details">
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
                <FontAwesomeIcon icon={faTrash} className="TrashIcon" onClick={deleteT}/>
                <FontAwesomeIcon icon={faUndo} className="UndoIcon" onClick={RestoreT}/></td>           
            </tr>
                ))}
        </tbody>
      </table>
    </div>
  </div>

  <div className="col-md-6">
      <Pagination
       postsPerPage={postsPerPage}
       totalPosts={TrashFileState.length}
       paginate={paginate}
        />
      </div>

</Fragment>
)
}

  export default TrashDisplayFiles;