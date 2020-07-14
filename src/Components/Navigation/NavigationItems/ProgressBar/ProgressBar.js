import React, { useState,useEffect } from "react";
// import './stylesProgress.scss';
import { getToken } from "../../../../Utils/Common";
import axios from 'axios';

function bytesToSize(bytes, seperator = "") {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes}${seperator}${sizes[i]}`
  return `${(bytes / (1024 ** i)).toFixed(1)}${seperator}${sizes[i]}`
}

const ProgressBar = () => {
  let [data, getData] = useState([]);
  console.log(getToken())
  
  //API call
  useEffect(() => {
    axios.get('https://systest.eisenvault.net/alfresco/s/aws-reposize',
    {headers:{
      Authorization: `Basic ${btoa(getToken())}`
    }
    })
    .then((response) =>{
    console.log(response.data)
    getData(response.data) 
  }).catch((error) => {
    console.error(error)
  });
  }, []);

  //Displaying the storage data.
  return (
    <div>

      <h5> Free Space: {bytesToSize(data.storeFreeSpace, " ")} </h5>
      <h5> Used Space: {bytesToSize(data.storageSpaceConsumed, " ")} </h5>

    </div>


    // <div className='containerStyles'>
      
      // <div className='fillerStyles'  />
    // </div>
  );
};

export default ProgressBar;
