import React,{Fragment, useEffect, useState} from 'react';
import './styleDashboard.scss';
import axios from 'axios';
import { getToken } from "../../Utils/Common";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faTimesCircle, faEye } from "@fortawesome/free-solid-svg-icons";

import Search from "../SearchBar/SearchBar";
import ProfilePic from "../Avtar/Avtar";

const Dashboard = () => {
  const [ documents , setDocuments ] = useState([]);

  useEffect(() => {
    axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/people/admin/activities?skipCount=0&maxItems=100',
    {headers:{
      Authorization: `Basic ${btoa(getToken())}`
    }
    }).then((response) => {
      console.log(response.data)
      setDocuments(response.data.list.entries)
    });
  },[]);

  return (
  <Fragment>

      <div id="second_section">
      <h2>Dashboard</h2>
        
        <Search />
        <ProfilePic />
      
      <div className="filesDetail">
        <h3>My Recent Activities</h3>
        <table className='documentsList'>
            {documents.map(document => ( 
            <tbody key={document.entry.id} >
                    <tr className='files'>

                      <td className='fileName'>
                        <FontAwesomeIcon icon={faFilePdf} />
                      {document.entry.activitySummary.title}</td>
                      
                      <td className='fileDetails'> 
                      {document.entry.postedAt} </td>

                      <td className='fileActivity'> 
                      {document.entry.activityType} </td>

                          <td className='view'>
                            <FontAwesomeIcon icon={faEye} />
                          </td>

                          <td className='dismiss'>
                            <FontAwesomeIcon icon={faTimesCircle} />
                          </td>
                        
                      </tr>
                    </tbody>
            ))}
        </table>
      </div>
  </div>

  </Fragment>
  )
};

export default Dashboard;