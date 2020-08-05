import React,{Fragment, useEffect, useState} from 'react';
import './styleDashboard.scss';
import axios from 'axios';
import FileViewer from 'react-file-viewer';

import { getToken, getUser } from "../../Utils/Common";
// import Iframe from 'react-iframe';
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
  // const [ preview, setPreview ] = useState([]);
  let preview;

  //API call to get the activities list.
  useEffect(() => {
    let personId = getUser();
    axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/people/${personId}/activities?skipCount=0&who=me`,
    {headers:{
      Authorization: `Basic ${btoa(getToken())}`
    }
    }).then((response) => {
      setDocuments(response.data.list.entries)
      setPaginationDefault(response.data.list.pagination) 
      console.log(response.data.list.pagination)
      console.log(response.data.list.entries)
    });
  }, []);

  useEffect(() => {
    axios.get('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/eddf18c2-4a39-4a7f-a556-679d5926d6f4/content?attachment=false',
    {headers:{
      Authorization: `Basic ${btoa(getToken())}`
    }
    }).then((response) => {
      preview = encodeURIComponent(response.data);
    });
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = documents.slice(indexOfFirstPost, indexOfLastPost);

  const totalPageNo = Math.ceil(documents.length/postsPerPage)

  console.log(indexOfFirstPost, 
    indexOfLastPost, 
    currentPosts, totalPageNo,
    currentPage)
    
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function CheckPosts(){
    const maxitems = (paginationDefualt.maxItems);
    console.log(maxitems)

    const hasMoreItem = (paginationDefualt.hasMoreItems);
    console.log(hasMoreItem)

    return( hasMoreItem===true ? 
      documents.length+10 && currentPosts.length+100
      : paginationDefualt )
  }
  // CheckPosts();

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
                      <h4 onClick = {() => (<iframe 
                        width="150px"
                        height="150px"/>)}
                        >
                        {document.entry.activitySummary.title}</h4> 
                        <p className="text">{ " " }in { " " }</p> 
                          <h4>{document.entry.siteId}</h4></td>
                          <td className='fileDetails'>{document.entry.postedAt.split('T')[0]} </td>
                          <td className='fileActivity'>{document.entry.activityType.split('.')[3]}</td>
                          <td className='view'><FontAwesomeIcon icon={faEye} /></td>
                      </tr>
                  </tbody>
            ))}
        </table>
      </div>
  </div>
  
    <div className="col-md-6">
     <Pagination
      postsPerPage={postsPerPage}
      totalPosts={CheckPosts()}
      paginate={paginate}
        />  
    </div>

  </Fragment>
  )
};

export default Dashboard;