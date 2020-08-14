import React,{ useState, useEffect} from "react";
import {useHistory } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
//import ReactSearchBox from "react-search-box";
import OutsideClickHandler from 'react-outside-click-handler';
import "./styleSearchBar.scss";
import { getToken } from '../../Utils/Common';

 const Search = () => {
  let history = useHistory();
  const [data ,setData] = useState([]);
    const [filtered ,setFilterd] = useState([]);
    const [result , setResult] = useState("");
    const [show , setShow] = useState(false);

      // useEffect(()=>{
            const fetchData =  ()=> {
                    try{
                        axios.get(`https://systest.eisenvault.net//alfresco/s/slingshot/live-search-docs?t=${result}&limit=5`,
                         
                             {headers:{
                                Authorization: `Basic ${btoa(getToken())}`
                                }
                              }).then((response) => {
                                       console.log("received")
                                     console.log(response.data)
                                     setData(response.data.items);
                                      setFilterd(response.data.items);
                                      setShow(true)
                                   });
                    }catch(err){
                      setResult("")
                      setData([])
                       setShow(false)
                        throw new Error(err);
                    }
                     };
                  
        // },[]);

        // useEffect(()=> {
        //     const results = filtered.filter(res=> res.name.toLowerCase().includes(result)

        //     ); 
        //     setData(results)
        // } ,[result])
        //console.log(data)
      const  handleOutsideClick = (e) => {
        setShow(false)
      }
      const onChange =(e)=> {
            setResult(e.target.value);
            if (result.length !== 0)
            {
              fetchData(result);
            }
            else if (result.length === 0){
              setData([])
              setShow(false)
            }
        }
      
      const onEnter = (event) => {
        if (event.key === "Enter")
        history.push(`/search/${result}`)
      }

        function handleDocument(id , name){
           history.push(`/doc/${id}/${name}`)
        }

    return (
        <div className="searchBox-container">
        <input 
            className="searchBox"
            type="text"
            placeholder="search here .."
            value={result}
            onChange={onChange}
        />            <FontAwesomeIcon icon={faSearch}/>

            onKeyUp={onEnter}
        />
        {show ? <OutsideClickHandler onOutsideClick={handleOutsideClick}><div className="menu-container">
        {data.map((r,i)=> ( 
                
                <ul key={i}>
                <li onClick={() => handleDocument(
                      r.nodeRef.substring(24),
                      r.name)}
                      className="search-item">{r.name}</li>
                </ul>
              )
            )
        }
        </div></OutsideClickHandler>: null}
    </div>
    )  

 }
  
export default Search;
