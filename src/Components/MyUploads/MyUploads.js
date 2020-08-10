import React, {useEffect,useState,Fragment} from 'react'
import Modal from "../Modal/Modal";
import { DeleteSummmary } from "../Modal/DeleteModalSumm/DeleteSumm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf,faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import './MyUploads.scss';
import Search from "../SearchBar/SearchBar";
import axios from 'axios';
import { getToken,getUser} from '../../Utils/Common';
import ProfilePic from "../Avtar/Avtar";
import Pagination from '../Pagination/Pagination';

function MyUploads(props){
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  
  const[FileState,setFileState]=useState([]);
  useEffect(()=>{
    getData();
  },[]);

  const [ currentPage, setCurrentPage ] = useState(1);
  const [postsPerPage] = useState(10);

  //api call
    const getData=()=>{
    axios.get(`https://systest.eisenvault.net/alfresco/s/slingshot/search?query={"prop_cm_creator":"${getUser()}","datatype":"cm:content"}`, 
        {headers:{
          Authorization: `Basic ${btoa(getToken())}`
           }}).then((response)=>{
             let FileData=response.data;
             console.log(FileData);
            setFileState(FileData.items.map(d=>{
              return {
                select:false,
                id:d.nodeRef.substring(23),
                name:d.name,
                uploadedOn:d.node.properties["cm:created"].iso8601.split('T')[0]
              }
            })) 
            }).catch(err=>alert(err));
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = FileState.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const closeModal=()=>{ //function to close modal after performing it's operations
    return  setmodalIsOpen(false);
  }
  //arrow function for getting file nodeid and putting it dynamically in api to delete single/multiple files
  const deleteFileByIds=()=>{
    FileState.forEach(d=>{
      if(d.select){
      axios.delete(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${d.id}`, 
      {headers:{
      Authorization: `Basic ${btoa(getToken())}`
       }
     }).then((data)=>{
          console.log(data);
          closeModal();
          getData();
           }).catch(err=>alert(err));
       };
      })}
      
    return( 
      <Fragment>
         <div id="second_section">
            <h2>My Uploads</h2>
            <Search />
              <ProfilePic />
               <div className="filesUpload">
                <table id="doc_list">
                  <tbody>
                  <tr id="icons">
                    <th id="icon01">
                      <input type="checkbox" onChange={(e)=>{
                        let checked=e.target.checked;
                        setFileState(currentPosts.map((d)=>{
                          d.select=checked;
                          return d;
                        }));
                      }}/>
                    </th>
                    <th id="item-name">Item Name</th>
                    <th id="shared">Uploaded On</th>
                    <th id="action">
                      <label>Action </label>
                      <select id="action-t" onChange={() => {setmodalIsOpen(true);}}>
                        <option id="option" value="delete-a">Delete All</option>
                        <option id="option" value="delete-s">Delete Selected</option>
                      </select>
                    </th>
                  <Modal show={modalIsOpen}>
                    <DeleteSummmary deleted={()=>{deleteFileByIds()}} clicked={() => setmodalIsOpen(false)}/>
                  </Modal>
                </tr> 
                  
                  { FileState.map((d,i) => (
                     <tr  key={d.id}  id="first_details">
                    <td className="file_icon1">
                      <input onChange={(event)=>{
                          let checked=event.target.checked;
           
                        setFileState(FileState.map((data)=>{
                          if(d.id===data.id){
                            data.select=checked;
                          }return data;
                         }));
                      }} type="checkbox" checked={d.select} />
                      </td>
                      
                    <td className="file_name-u" >
                    
                    <FontAwesomeIcon className="pdf-file fas fa-file-pdf" icon={faFilePdf}/> {d.name}</td>
                    <td className="details-u">{d.uploadedOn}</td>
                    <td className="delete-u">
          <FontAwesomeIcon className="fas fa-times-circle" icon={faTimesCircle} 
                    onClick={() =>{setmodalIsOpen(true)}}
                  
                      />
                  </td>
                  </tr>
                  
                  ))}
                </tbody>  
              </table>
              
              </div>
              </div>

      <div className="col-md-6">
      <Pagination
       postsPerPage={postsPerPage}
       totalPosts={FileState.length}
       paginate={paginate}
        />
        </div>
    </Fragment>

          )
          }
export default MyUploads;
