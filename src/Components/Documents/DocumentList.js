import React,{Fragment} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia, faFile, faHdd, faFolder } from "@fortawesome/free-solid-svg-icons";
import './DocumentList.scss';
import Avatar from "react-avatar";

import Search from "../SearchBar/SearchBar";
import IconBar from "../IconBar/IconBar";

import Modal from '../UI/Modal/Modal';
import ModalAdd from '../UI/Modal/ModalAdd';
import ModalTrash from '../UI/Modal/ModalTrash';
import useModal from '../UI/Modal/useModal';

const documents = [
    {
        id: 1,
        name: 'HR',
        folders: '1000 Folders',
        files: '200 Files',
        size: '20 MB'
    },
    {
        id: 2,
        name: 'IT',
        folders: '1000 Folders',
        files: '200 Files',
        size: '20 MB'
    },
    
    {
      id: 3,
      name: 'Finance',
      folders: '1000 Folders',
      files: '200 Files',
      size: '20 MB'    
    },
  
    {
      id: 4,
      name: 'Warehouse',
      folders: '1000 Folders',
      files: '200 Files',
      size: '20 MB'    
    },

    {
      id: 5,
      name: 'Customer Support',
      folders: '1000 Folders',
      files: '200 Files',
      size: '20 MB'    
    },
  
];

const DocumentsList = () => {
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

        <Avatar className='avtarStyle'
            color='#E07050' size='3rem'
            round 
            name="Shayane Basu" /> 
        
            <div>
              <IconBar toggle1= {toggle1} 
                      toggle2 = {toggle2}
                      toggle3 = {toggle3}
              />
            </div>

      <ul className='files'>
      <h2>My Departments</h2>
          
          <table id="doc_list">
          {documents.map(document => (
              <tbody key={document.id}>
                  <tr className='details'>
                    <td className='fileicon'>
                    <FontAwesomeIcon icon={faGlobeAsia} className="fas"/>
                    {document.name}</td>

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