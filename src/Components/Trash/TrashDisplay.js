import React, { Fragment,useEffect,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Avatar from "react-avatar";
import Search from '../SearchBar/SearchBar';
import '../MyUploads/MyUploads.scss';
import './TrashDisplay.scss';
import '../../Containers/styles.scss';
import useModal from '../UI/Modal/useModal';
import RestoreFile from '../UI/Modal/RestoreFile';
import DeleteModal from '../UI/Modal/DeleteModal';
// import {getToken} from '../../Utils/Common';
function TrashDisplayFiles(props){
  const[TrashFileState,setTrashFileState]=useState([]);
  const {isShowing: isShowing1,toggle: toggle4} = useModal();
  const {isShowing:isShowing2,toggle:toggle5}=useModal();
useEffect(()=>{
  axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/deleted-nodes',
  {headers:{Authorization: "Basic " + btoa("TICKET_f704a0c65478261285b9c1d3d5b3758cef9f4919")
  }}

  ).then((response) => {
    console.log(response.data)
    setTrashFileState(response.data.list.entries)
  
  });
  },[]);
// let TrashFileState=[
// {id:1 ,Item_Name:"Sample1.pdf",created_On:"2 Month Ago",deleted_on:"1 Day ago"},
// {id:2 ,Item_Name:"Sample2.pdf",created_On:"2 Weeks Ago",deleted_on:"1 Hour ago"},
// {id:3 ,Item_Name:"Sample3.pdf",created_On:"20 Days Ago",deleted_on:"2 Day ago"}
// ];
// setTrashFileState(
//   TrashFileState.map(d=>{
//     return{
// select:false,
// id:d.id,
// Item_Name:d.Item_Name,
// created_On:d.created_On,
// deleted_on:d.deleted_on
//     };
//   }));
// },[]);

return(
    <Fragment>
         <DeleteModal isShowing = {isShowing1} hide={toggle4}/>
         <RestoreFile isShowing={isShowing2} hide={toggle5}/>
         <div id="second_section">
            <h2>Trash</h2>
            <Search />

            <Avatar className='avtarStyle'
                color='#E07050' size='3rem'
                round 
                name="Shayane Basu" /> 
             
      
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
                <th id="created">Created</th> 
                <th id="deleted">Deleted</th>
                <th id="action-trash">
                    <label>Action </label>
                      <select id="action-t" onChange={toggle4}>
                        <option value="delete-a">Delete All</option>
                        <option value="delete-s">Delete Selected</option>
                        <option value="delete-a">Restore All</option>
                        <option value="delete-s">Restore Selected</option>
                      </select>
                  </th>           
                </tr>
                
                {TrashFileState.map((d,i) => (
                 <tr  key={d.entry.id} id="first_details">
                 <td className="file_icon1">
                   <input onChange={(event)=>{
                      let checked=event.target.checked;
                    setTrashFileState(TrashFileState.map((data)=>{
                      if(d.entry.id===data.entry.id){
                        data.select=checked;
                      }return data;
                    }));
                   }} type="checkbox" checked={d.select}
                    /> </td> 
                <td className="file_name_t">{d.entry.name}</td>
                <td className="created_t">{d.entry.createdAt}</td>                     
                <td className="deleted_t">{d.entry.archivedAt}</td> 
                <td className="delete-icon">
                <FontAwesomeIcon icon={faTrash} className="TrashIcon" onClick={toggle4}/>
                <FontAwesomeIcon icon={faUndo} className="UndoIcon" onClick={toggle5}/></td>           
            </tr>
                ))}
        </tbody>
      </table>
    </div>
  </div>
</Fragment>
)
}

  export default TrashDisplayFiles;