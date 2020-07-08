import React,{Fragment} from 'react';
import './styleDashboard.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faTimesCircle, faEye } from "@fortawesome/free-solid-svg-icons";

import Avatar from "react-avatar";
import { getUser } from "../../Utils/Common";
import Search from "../SearchBar/SearchBar";

const files = [
    {
        id: 1,
        name: 'Sample1.pdf',
        details: 'Downloaded 2 days ago',
    },
    {
        id: 2,
        name: 'Sample2.pdf',
        details: 'Downloaded 2 days ago',
    },
    
    {
      id: 3,
      name: 'Sample3.pdf',
      details: 'Downloaded 2 days ago',
    },
  
    {
      id: 4,
      name: 'Sample4.pdf',
      details: 'Downloaded 2 days ago',
    },
    {
      id: 5,
      name: 'Sample5.pdf',
      details: 'Downloaded 2 days ago',
    },
    
    {
      id: 6,
      name: 'Sample6.docx',
      details: 'Downloaded 2 days ago',
    },

    {
      id: 7,
      name: 'Sample7.pdf',
      details: 'Downloaded 2 days ago',
    },

    {
      id: 8,
      name: 'Sample8.pdf',
      details: 'Downloaded 2 days ago',    
    },
];

console.log(getUser())
// console.log(getToken())

const profileInitials= getUser().charAt(0);

const Dashboard = () => (
  <Fragment>

      <div id="second_section">
      <h2>Dashboard</h2>
        
        <Search />
        
        <Avatar className='avtarStyle'
            color='#E07050' size='3rem'
            round 
            maxInitials= {2}
            name= {profileInitials}
            title= {getUser()}/>             
      
      <div className="filesDetail">
        <h3>My Recent Activities</h3>
        <table className='documentsList'>
            {files.map(file => ( <tbody key={file.id} >
                    <tr className='files'>

                      <td className='fileName'>
                        <FontAwesomeIcon icon={faFilePdf} />
                      {file.name}</td>
                      
                      <td className='fileDetails'> 
                      {file.details} </td>

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

);

export default Dashboard;