import React,{Fragment , useEffect , useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia, faFile, faHdd, faFolder } from "@fortawesome/free-solid-svg-icons";
import './DocumentList.scss';
import ProfilePic from "../Avtar/Avtar";

import Search from "../SearchBar/SearchBar";
import IconBar from "../IconBar/IconBar";

import Modal from '../UI/Modal/Modal';
import ModalAdd from '../UI/Modal/ModalAdd';
import ModalTrash from '../UI/Modal/ModalTrash';
import useModal from '../UI/Modal/useModal';

const DocumentsList = () => {
  const [ departments , setDepartments ] = useState([]);

  useEffect(() => {
    axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/sites?skipCount=0&maxItems=100',{
      withCredentials: true
    },
    { 
      auth: {
        username : 'admin',
        password: 'Systest@987'
      }
    }).then((response) => {
      console.log(response.data)
      setDepartments(response.data.list.entries)
    });
  },[]);
const {isShowing: isShowing1,toggle: toggle1} = useModal();
const {isShowing: isShowing2,toggle: toggle2} = useModal();
const {isShowing: isShowing3,toggle: toggle3} = useModal();

return (
  <Fragment>
  
      <Modal isShowing = {isShowing1} hide={toggle1}/>
      <ModalAdd isShowing1 = {isShowing2} hide={toggle2}/>
      <ModalTrash isShowing = {isShowing3} hide={toggle3}/>

      <div id="second_section">
      <h2>Document List</h2>
        <Search />
        <ProfilePic />
        
            <div>
              <IconBar toggle1= {toggle1} 
                      toggle2 = {toggle2}
                      toggle3 = {toggle3}
              />
            </div>

      <ul className='files'>
      <h2>My Departments</h2>
          
           <table id="doc_list">
          {departments.map(department => (
              <tbody key={department.entry.id}>
                  <tr className='details'>
                    <td className='fileicon'>
                    <FontAwesomeIcon icon={faGlobeAsia} className="fas"/>
                    {department.entry.title}</td>

                     <td className='fileDetails'>
                    <FontAwesomeIcon icon={faFolder} className="fas"/> 
                    {document.folders} </td>

                    <td className='fileDetails'> 
                    <FontAwesomeIcon icon={faFile} className="fas"/>
                    {document.files} </td>

                    <td className='fileDetails'> 
                    <FontAwesomeIcon icon={faHdd} className="fas"/>
                    {document.size} </td>

                   </tr>
                </tbody>
          ))}
          </table> 
      </ul>

      </div>

  </Fragment>
      )
    };

export default DocumentsList;