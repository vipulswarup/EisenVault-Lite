import React,{Fragment, useEffect, useState} from 'react';
import './styleDashboard.scss';
import axios from 'axios';
import { getToken } from "../../Utils/Common";
import Iframe from 'react-iframe';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faEye } from "@fortawesome/free-solid-svg-icons";

import Search from "../SearchBar/SearchBar";
import ProfilePic from "../Avtar/Avtar";
import Pagination from '../Pagination/Pagination';

const Dashboard = () => {
  const [ documents , setDocuments ] = useState([]);
  
  const [ currentPage, setCurrentPage ] = useState(1);
  const [postsPerPage] = useState(10);
  const [ paginationDefualt, setPaginationDefault ] = useState([]);
  const [ preview, setPreview ] = useState([]);
  
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

useEffect(() => {
    axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/c8714e7e-f32f-4e94-86cd-f25b7947c221/content?attachment=true',
    {headers:{
      Authorization: `Basic ${btoa(getToken())}`
    }
    }).then((response) => {
      setPreview(response.data)
      console.log(response.data)
    });
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = documents.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const iframe = <iFrame src= {`${preview}`}
  //                           width="450px"
  //                           height="450px"
  //                           id="myId"
  //                           className="myClassname"
  //                           display="initial"
  //                           position="relative" />

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
                        <FontAwesomeIcon icon={faFile} />
                        <h4>{document.entry.activitySummary.title}</h4> 
                         &nbsp;in <h4>{document.entry.siteId}</h4>
                        </td>

                      <td className='fileDetails'> 
                        {document.entry.postedAt.split('T')[0]} 
                        </td>

                      <td className='fileActivity'> 
                        {document.entry.activityType.split('.')[3]} </td>

                          <td className='view'>
                            <FontAwesomeIcon icon={faEye} />
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