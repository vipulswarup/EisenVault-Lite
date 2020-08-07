import React,{ useState, useEffect} from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
//import ReactSearchBox from "react-search-box";
import OutsideClickHandler from 'react-outside-click-handler';
import "./styleSearchBar.scss";
import { getToken } from '../../Utils/Common';

 const Search = () => {
  const [data ,setData] = useState([]);
    const [filtered ,setFilterd] = useState([]);
    const [result , setResult] = useState("");
    const [show , setShow] = useState(false);

      // useEffect(()=>{
            const fetchData =  ()=> {
                    try{
                        axios.post('https://systest.eisenvault.net/alfresco/api/-default-/public/search/versions/1/search',
                        {
                          "query": {
                            "query": `${result}`
                          },
                          "include": ["properties", "isLink"],
                          "fields": ["id", "name", "search"],
                          "sort": [{"type":"FIELD", "field":"name", "ascending":"true"}],
                          
                        }, 
                             {headers:{
                                Authorization: `Basic ${btoa(getToken())}`
                                }
                              }).then((response) => {
                                       console.log("received")
                                     console.log(response.data)
                                     setData(response.data.list.entries);
                                      setFilterd(response.data.list.entries);
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

    return (
        <div className="searchBox-container">
        <input 
            className="searchBox"
            type="text"
            placeholder="serch here .."
            value={result}
            onChange={onChange}
        />
        {show ? <OutsideClickHandler onOutsideClick={handleOutsideClick}><div className="menu-container">
        {data.map((r,i)=> ( 
                
                <ul key={i}>
                <li>{r.entry.name}</li>
                </ul>
              )
            )
        }
        </div></OutsideClickHandler>: null}
    </div>
    )  

 }
  

  //   return (
  //     <div className="container">
          
  //         <ReactSearchBox
  //           inputBoxHeight= '1rem'
  //           inputBoxBorderColor= 'transparent'
  //           dropDownHoverColor= '#ccc'
  //           dropDownBorderColor= 'transparent'
  //           placeholder="Start typing to search your documents"
  //           value=""
  //           data={data}
  //           onChange={handleSearch}
  //         /> 
  //   </div>
  //   );
  // }

export default Search;
