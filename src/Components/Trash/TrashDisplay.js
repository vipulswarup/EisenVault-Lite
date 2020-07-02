import React, { Fragment,useEffect,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faUndo} from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";
import Search from '../SearchBar/SearchBar';
import Pagination from "../Pagination/Pagination";
//import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import '../MyUploads/MyUploads.scss';
import './TrashDisplay.scss';
import '../../Containers/styles.scss';
import useModal from '../UI/Modal/useModal';

import DeleteModal from '../UI/Modal/DeleteModal';

//import MobileMenu from '../MobileMenu/MobileMenu';
function TrashDisplayFiles(props){
  const[TrashFileState,setTrashFileState]=useState([]);
  const {isShowing: isShowing1,toggle: toggle4} = useModal();
useEffect(()=>{
let TrashFileState=[
{id:1 ,Item_Name:"Sample1.pdf",created_On:"2 Month Ago",deleted_on:"1 Day ago"},
{id:2 ,Item_Name:"Sample2.pdf",created_On:"2 Weeks Ago",deleted_on:"1 Hour ago"},
{id:3 ,Item_Name:"Sample3.pdf",created_On:"20 Days Ago",deleted_on:"2 Day ago"}
];
setTrashFileState(
  TrashFileState.map(d=>{
    return{
select:false,
id:d.id,
Item_Name:d.Item_Name,
created_On:d.created_On,
deleted_on:d.deleted_on
    };
  }));
},[]);

return(
    <Fragment>
         <DeleteModal isShowing = {isShowing1} hide={toggle4}/>
         <div id="second_section">
          <div>
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
                <td className="file_name_t">{d.Item_Name}</td>
                <td className="created_t">{d.created_On}</td>                     
                <td className="deleted_t">{d.deleted_on}</td> 
                <td className="delete-icon">
                <FontAwesomeIcon icon={faTrash} className="TrashIcon" onClick={props.deleted}/>
                <FontAwesomeIcon icon={faUndo} className="UndoIcon"/></td>           
            </tr>
                ))}
        </tbody></table>
         </div>
         </div>
                 <footer className="base-footer">
                    <Pagination/>

                     <p>Copyright © 2020 
                     <a href="https://www.argali.in/">
                      Argali Knowledge Services Pvt. Ltd., New Delhi, India</a></p>
                 </footer>
          </div> </Fragment>
)
    }

  export default TrashDisplayFiles;