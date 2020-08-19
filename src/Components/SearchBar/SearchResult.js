import React, {useEffect,useState,Fragment} from 'react';
import { useParams , useHistory } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFile,faTimesCircle,faFolder} from "@fortawesome/free-solid-svg-icons";

import {getToken} from  "../../Utils/Common";




function SearchResult(){
  let history = useHistory();
  const[documents,setDocuments]=useState([]);

   let params = useParams();
   const result = params.result;
   

useEffect(()=>{
        axios.get(`https://systest.eisenvault.net/alfresco/s/slingshot/search?term=${result}`,
        {
          headers:
          {
            Authorization: `Basic ${btoa(getToken())}`
          }
          }).then((response) => {
        console.log(response.data)
        setDocuments(response.data.items)
      }).catch((error) => {
        console.log(error);
      }
      );
    },[result]);

    function handleDocument(id , name){
      history.push(`/document-details/${id}/${name}`)
   }
    
    return( 
      <Fragment>
         <div id="second_section">
            <h2>SearchResult</h2>
            

              <div className="filesShared">
                <table id="doc_list">
                  <thead>
                  <tr id="icons">
                    <th id="item-names">Item Name</th>
                    <th id="shared">Department Name</th>
                    <th id="action">Actions</th>
                  </tr>
                  </thead>
                  { documents.map((d) => (
                  <tbody key={d.nodeRef}>
                    <tr id="first_details">
                    <td className="file_name-u"  onClick={() => handleDocument(
                      d.nodeRef.substring(24),
                      d.name)}
                   >
                    {d.name}</td>
                    <td className="details-u-s">{d.path}</td>
                    <td className="delete-u-s">
                    <FontAwesomeIcon className="fas fa-times-circle" icon={faTimesCircle} />
                  </td>
                  </tr>
                </tbody>
                ) )}
              </table>
            </div>
            </div>

      <div className="col-md-6">
      
        </div>
    </Fragment>

          )
          }

export default SearchResult;