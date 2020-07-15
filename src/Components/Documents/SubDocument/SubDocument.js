import React, {useEffect,useState,Fragment} from 'react';
import { useParams , useHistory } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf,faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {getToken} from  "../../../../Utils/Common";
import ProfilePic from "../../Avtar/Avtar";

import Avatar from "react-avatar"
import Search from "../../SearchBar/SearchBar";
import Avatar from "react-avatar"
import Search from "../../SearchBar/SearchBar";
import {getToken} from  "../../../Utils/Common";
import Search from "../../../SearchBar/SearchBar";
import {getToken} from  "../../../../Utils/Common";
import ProfilePic from "../../../Avtar/Avtar";

function SubDocument(){
  let history = useHistory();
  const[documents,setDocuments]=useState([]);
   let params = useParams();
   const id = params.id;
   
 
useEffect(()=>{
        axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/children?skipCount=0&maxItems=100`,
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
    },[id]);

    function handleDocument(file , id , name){
      file ? history.push(`/doc/${id}/${name}`): history.push(`/document/${id}`)
    }
    return( 
      <Fragment>
         <div id="second_section">
            <h2>Document Library</h2>
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
                  { documents.map((d,i) => (
                    <tr  key={d.id} id="first_details">
                    <td className="file_name-u">
                    
                    <FontAwesomeIcon className="pdf-file fas fa-file-pdf" icon={faFilePdf} onClick={() => handleDocument(d.entry.isFile,d.entry.id,d.entry.name)}/> {d.entry.name}</td>
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

export default SubDocument;