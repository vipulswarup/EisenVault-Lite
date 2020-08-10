import React,{Fragment, useEffect, useState} from 'react';
import './styleDashboard.scss';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

// import documentsPreview from '../DocumentsPreview/DocumentsPreview';
import { getToken, getUser } from "../../Utils/Common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faEye } from "@fortawesome/free-solid-svg-icons";
import Search from "../SearchBar/SearchBar";
import ProfilePic from "../Avtar/Avtar";
import Pagination from '../Pagination/Pagination';

const Dashboard = () => {
  let history = useHistory();
  let params = useParams();
  const id = params.id;

  const [ documents , setDocuments ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [postsPerPage] = useState(10);
  const [ paginationDefualt, setPaginationDefault ] = useState([]);

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
  CheckPosts();

  function handleDocument(id , name){
    history.push(`/doc/${id}/${name}`)
  }
  
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
                        <h4 onClick={() => handleDocument(
                      document.entry.activitySummary.objectId,
                      document.entry.activitySummary.title) }>
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
      totalPosts={paginationDefualt.count}
      paginate={paginate}
        />  
    </div>

  </Fragment>
  )
};

export default Dashboard;