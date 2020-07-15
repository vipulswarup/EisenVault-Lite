import React, {useEffect,useState,Fragment} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf,faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import '../ManageShares/ManageShares.scss'
import "./sharedWithMe.scss";
import Search from "../SearchBar/SearchBar";
import useModal from '../UI/Modal/useModal';
import DeleteModal from '../UI/Modal/DeleteModal';
import { getToken } from '../../Utils/Common';
import axios from 'axios';
import ProfilePic from "../Avtar/Avtar";

function SharedWithMe(){
  const[FileState,setFileState]=useState([]);
  const {isShowing: isShowing1,toggle: deleteT} = useModal();
 
//API CALL
useEffect(()=>{
  axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/5ccc676b-0a0c-4f9f-b176-87a786b3b5d8/children?skipCount=0&maxItems=100',
  {headers:{
    Authorization: `Basic ${btoa(getToken())}`
    }}).then((response)=>{
      let FileData=response.data;
     setFileState(response.data.list.entries.map(d=>{
       return {
         id:d.entry.id,
         name:d.entry.name,
         sharedBy:d.entry.createdByUser.displayName,
         sharedOn:d.entry.modifiedAt.split('T')[0]
       }
     })) 
     }).catch(err=>alert(err));
})

    return( 
      <Fragment>
        <DeleteModal isShowing = {isShowing1} hide={deleteT} />

         <div id="second_section">
            <h2>My Shares</h2>
            <Search />

            <ProfilePic />
          
          <div className="filesUpload">
        <table id="doc_list">
          <tbody>
          <tr id="icons">
                    <th id="item-names">Item Name</th>
                    <th id="shared">Shared By</th>
                    <th id="shared">Shared On</th>
                    <th id="action">Actions</th>
                  </tr>
                  { FileState.map((d,i) => (
                    <tr  key={d.id} id="first_details">
                    <td className="file_name-u">
                    
                    <FontAwesomeIcon className="pdf-file fas fa-file-pdf" icon={faFilePdf}/> {d.name}</td>
                    <td className="details-u-s">{d.sharedBy}</td>
                    <td className="details-u-s">{d.sharedOn}</td>
                    <td className="delete-u-s">
                    <FontAwesomeIcon className="fas fa-times-circle" icon={faTimesCircle} 
                      onClick={deleteT}
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

export default SharedWithMe;