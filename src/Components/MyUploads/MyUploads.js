import React, {useEffect,useState,Fragment} from 'react'
import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf,faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import Action from '../Action/Action';
import './MyUploads.scss';
import Search from "../SearchBar/SearchBar";
import axios from 'axios';
import { getToken } from '../../Utils/Common';
import ProfilePic from "../Avtar/Avtar";
import Pagination from '../Pagination/Pagination';


function MyUploads(){
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const[FileState,setFileState]=useState([]);
  useEffect(()=>{
    getData();
  },[]);

  const [ currentPage, setCurrentPage ] = useState(1);
  const [postsPerPage] = useState(10);

  //api call
    const getData=()=>{
    axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/1252bca5-a90d-4c20-aa0c-23b8f4d4325b/children?skipCount=0&maxItems=100', 
        {headers:{
          Authorization: `Basic ${btoa(getToken())}`
           }}).then((response)=>{
             let FileData=response.data;
            setFileState(response.data.list.entries.map(d=>{
              return {
                select:false,
                id:d.entry.id,
                name:d.entry.name,
                uploadedOn:d.entry.createdAt.split('T')[0]
              }
            })) 
            }).catch(err=>alert(err));
  };
  //arrow function to delete single/multiple files

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = FileState.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //arrow function for getting file nodeid and putting it dynamically in api
  const deleteFileByIds=()=>{
    FileState.forEach(d=>{
      if(d.select){
      axios.delete(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${d.id}`, 
      {headers:{
      Authorization: `Basic ${btoa(getToken())}`
       }
     }).then((data)=>{
          console.log(data);
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
                  
        <th id="action"><Action deleted={()=>{deleteFileByIds()}}/></th>
        <Modal
            className="Modal"
            isOpen={modalIsOpen}
            shouldCloseOnOverlayClick={false}
            onRequestClose={() => setmodalIsOpen(false)}
            style={{
              overlay: {
                backgroundColor:"rgba(0, 0, 0, 0.6)"
              }
            }}
            ariaHideApp={false}
          >
            <h2 className="Dh2">Delete Documents</h2>
            <p className="content Dh3">
              Are you sure you want to delete selected files?
              <br />
              <br /> NOTE:The deleted file will be stored in trash for 30 days.
            </p>

            <button
              className="btn-cancel btn-c"
              onClick={() => setmodalIsOpen(false)}
            >
              CANCEL
            </button>
            <button className="btn-continue btn-d" onClick={()=>{deleteFileByIds()}}>DELETE</button>
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
                      onClick={() => setmodalIsOpen(true)} />
 
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
