import React,{Fragment, useEffect, useState} from 'react';
import './styleDashboard.scss';
import axios from 'axios';
import { getToken } from "../../Utils/Common";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faTimesCircle, faEye } from "@fortawesome/free-solid-svg-icons";

import Search from "../SearchBar/SearchBar";
import ProfilePic from "../Avtar/Avtar";
import Pagination from '../Pagination/Pagination';

const Dashboard = () => {
  const [ documents , setDocuments ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [postsPerPage] = useState(10);
  const [ paginationDefualt, setPaginationDefault ] = useState([]);
  
  //API call.
  useEffect(() => {
    axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/people/admin/activities?skipCount=0&maxItems=1000',
    {headers:{
      Authorization: `Basic ${btoa(getToken())}`
    }
    }).then((response) => {
      console.log(response.data)
      setDocuments(response.data.list.entries)
      setPaginationDefault(response.data.list.pagination)
    });
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = documents.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
  <Fragment>

      <div id="second_section">
      <h2>Dashboard</h2>
        
        <Search />
        <ProfilePic />
      
      <div className="filesDetail">
        <h3>My Recent Activities</h3>
        <table className='documentsList'>
            {currentPosts.map(document => ( 
            <tbody key={document.entry.id} >
                    <tr className='files'>

                      <td className='fileName'>
                        <FontAwesomeIcon icon={faFilePdf} />
                        {document.entry.activitySummary.title}</td>
                      
                      <td className='fileDetails'> 
                        {document.entry.postedAt.split('T')[0]} 
                        </td>

                      <td className='fileActivity'> 
                        {document.entry.activityType.split('.')[3]} </td>

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
  
    <div className="col-md-6">
      <Pagination
       postsPerPage={postsPerPage}
       totalPosts={paginationDefualt.count}
       paginate={paginate}
        />
        </div>

  </Fragment>
  )
};

export default Dashboard;