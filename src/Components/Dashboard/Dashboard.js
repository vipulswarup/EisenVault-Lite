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
  let personId = getUser();
  let history = useHistory();
  let params = useParams();
  const id = params.id;
  
  const [count, setCount] = useState(0)
  const [ documents , setDocuments ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [postsPerPage] = useState(10);
  const [ paginationDefualt, setPaginationDefault ] = useState([]);
  const [hasMoreItems , setMoreItems] = useState('');
  const [skipCount , setSkipCount ] = useState('');

  //API call to get the activities list.
  useEffect(() => {

    
    axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/people/${personId}/activities?skipCount=0&who=me&maxItems=10`,
    {headers:{
      Authorization: `Basic ${btoa(getToken())}`
    }}).then((response) => {
      setDocuments(response.data.list.entries)
      setPaginationDefault(response.data.list.pagination)
      setMoreItems(response.data.list.pagination.hasMoreItems)
      setSkipCount(response.data.list.pagination.skipCount + 10)
      console.log(response.data.list.entries)
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

  function next(){
  
    //  setSkipCount(skipCount + 10)
     console.log(skipCount);
     axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/people/${personId}/activities?skipCount=${skipCount}&who=me&maxItems=10`,
     {headers:{
       Authorization: `Basic ${btoa(getToken())}`
     }}).then((response) => {
       setDocuments(response.data.list.entries)
       setPaginationDefault(response.data.list.pagination)
       setMoreItems(response.data.list.pagination.hasMoreItems)
       setMoreItems(response.data.list.pagination.hasMoreItems)
     if (response.data.list.pagination.hasMoreItems){
      setSkipCount(response.data.list.pagination.skipCount + 10)
     }
     else{
      setSkipCount(response.data.list.pagination.skipCount - 10)
     }
       console.log(response.data.list.entries)
       console.log(response.data.list.pagination.skipCount)
     });
   
  }

  function previous(){
      axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/people/${personId}/activities?skipCount=${skipCount}&who=me&maxItems=10`,
      {headers:{
        Authorization: `Basic ${btoa(getToken())}`
      }}).then((response) => {
        setDocuments(response.data.list.entries)
        setPaginationDefault(response.data.list.pagination)
        setMoreItems(response.data.list.pagination.hasMoreItems)
        if (response.data.list.pagination.skipCount > 0){
          setSkipCount(response.data.list.pagination.skipCount - 10)
        }
        else{
          setSkipCount(response.data.list.pagination.skipCount + 10)
        }
        console.log(response.data.list.entries)
        console.log(response.data.list.pagination)
        console.log(response.data.list.pagination.skipCount)
      });
   }

  function handleDocument(id,title){
    history.push(`/document-details/${id}/${title}`)
  }

  return (
  <Fragment>

      <div id="second_section">

      <div className="top-menu">

        <h2>Dashboard</h2>
        
        <Search />
        <ProfilePic />
        
      </div>
      <div className="filesDetail">
        <h3>My Recent Activities</h3>

        <table className='documentsList'>
            {currentPosts.map(document => (               
            <tbody key={document.entry.id} >
                <tr className='files'>
                  <td className='fileName'>                             
                    <FontAwesomeIcon icon={faFile} />
                        <h4>
                          {document.entry.activitySummary.title} 
                        </h4> 
                        <p className="text">{ " " }in { " " }</p> 
                          <h4>{document.entry.siteId}</h4> 
                          </td>
                          <td className='fileDetails'>
                            {document.entry.postedAt.split('T')[0]} </td>
                          <td className='fileActivity'>
                            {document.entry.activityType.split('.')[3]}</td>
                          <td className='view'
                          onClick={() => handleDocument(
                            document.entry.activitySummary.objectId,
                            document.entry.activitySummary.title) }>
                              <FontAwesomeIcon icon={faEye} /></td>
                      </tr>
                  </tbody>
            ))}
        </table>
      </div>
  </div>
  
    <div className="col-md-6">
     <Pagination
     handlePrev={previous}
     handleNext={next}
     hasMoreItems={hasMoreItems}
     skipCount={skipCount}
      // postsPerPage={postsPerPage}
      // totalPosts={paginationDefualt.count}
      // paginate={paginate}
        />  
    </div>

  </Fragment>
  )
};

export default Dashboard;