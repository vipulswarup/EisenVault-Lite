import React,{Fragment , useEffect , useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia, faFile, faHdd, faFolder } from "@fortawesome/free-solid-svg-icons";
import './DocumentList.scss';

import {getToken} from  "../../Utils/Common";
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
    axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/sites?skipCount=0&maxItems=100',
      {
        headers:
        {
          Authorization: `Basic ${btoa(getToken())}`
        }
        }).then((response) => {
      console.log(response.data)
      setDepartments(response.data.list.entries)
    });
  },[]);
const {isShowing: isShowing1,toggle: togglecreate} = useModal();
const {isShowing: isShowing2,toggle: toggleadd} = useModal();
const {isShowing: isShowing3,toggle: toggletrash} = useModal();

return (
  <Fragment>
  
      <Modal isShowing = {isShowing1} hide={togglecreate}/>
      <ModalAdd isShowing1 = {isShowing2} hide={toggleadd}/>
      <ModalTrash isShowing = {isShowing3} hide={toggletrash}/>

      <div id="second_section">
      <h2>Document List</h2>
        <Search />
        <ProfilePic />
        
            <div>
              <IconBar togglecreate= {togglecreate} 
                      toggleadd = {toggleadd}
                      toggletrash = {toggletrash}
              />
            </div>

      <ul className='files'>
      <h2>My Departments</h2>
          
           <table id="doc_list">
          {departments.map(department => (
              <tbody key={department.entry.id}>
                  <tr className='details'>
                  <td className='fileicon'>
                  <Link to={{pathname:`/department/${department.entry.title}/${department.entry.guid}`,state:{data : department.entry}}}>
                    <FontAwesomeIcon icon={faGlobeAsia} className="fas"/>
                    {department.entry.title}</Link></td>

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