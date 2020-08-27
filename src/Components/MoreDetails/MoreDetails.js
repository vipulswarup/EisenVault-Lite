import React , { Fragment,useRef,useEffect } from 'react';
import "./MoreDetails.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShareAlt} from "@fortawesome/free-solid-svg-icons"
import {instance} from "../ApiUrl/endpointName.instatnce"
import { useHistory } from "react-router-dom";
import {getToken} from "../../Utils/Common";
import Axios from 'axios';
import useOutsideClick from '../Backdrop/OutsideClick';

const DocumentDetails = (props) => {
    const ref = useRef();

    // useOutsideClick(ref, () => {
    //   alert('You clicked outside')
    // });

    // const [showDetailsbar, setShowDetailsbar] = useState(true);
    let history = useHistory();
    const path = window.location.href; 
    const id =  path.slice(41,77) 
     
    let detailclasses='pdf-preview';
    if(props.show){
      detailclasses='pdf-preview open';
    }

    function DocumentShare () {
        instance.post(`/shared-links`,
        {"nodeId":`${id}`},
        {
            headers: {
              Authorization: `Basic ${btoa(getToken())}`,
           },
          }).then((response) => {
              alert("Your public share link is " + "https://systest.eisenvault.net/share/s/" + response.data.entry.id)
          }) 
    }

    function ChangeDocType(){
        Axios.get("https://systest.eisenvault.net/alfresco/s/uploader-plus/list-content-types",
        {
            headers: {
              Authorization: `Basic ${btoa(getToken())}`,
           },
          }).then((response) => {
              console.log(response.data.types)
          })
    }

    function AuditTrail(){
        Axios.get("https://systest.eisenvault.net/alfresco/s/ev/nodeaudittrail?nodeRef=workspace://SpacesStore/4c0fe138-f27d-43b2-9f36-81ad2634ac1f",
        {
            headers: {
              Authorization: `Basic ${btoa(getToken())}`,
           },
          }).then((response)=>{
              console.log(response.data)
          })}

    return(
        <Fragment>
            <div className={detailclasses}>
                <div id="details-pdf" className="pdf_details">
                    <div className="details-p" ref={ref} >
                        {/* <button onClick={() => history.goBack()}>&times;</button> */}

                        <button onClick={()=> (DocumentShare())}>
                        <FontAwesomeIcon className="Icon" icon={faShareAlt}/>Click here to share</button> 
                    
                    <p className="top-heaading">Category:</p>
                    <p>Aadhaar Card <a className="pdf-link" onClick={()=>(ChangeDocType())}>
                        (click here to change)</a></p>
                    </div>

                    {/* <div id="popup1" className="overlay">
                        <div className="popup-n">
                            <h2>PDF-Sample.pdf</h2>
                            <a className="close" href="#">&times;</a>
                            <div className="content">
                                <h3>Auto Identified Category:  Aadhaar Card</h3>
                                <p>
                                    <label>New Category:</label>

                                    <input list="brow">
                                    <datalist id = "brow">
                                    <option value = "Passport"></option>
                                    <option value = "Phone Bill"></option>
                                    <option value = "Utility Bill"></option>
                                    <option value = "Insurance Policy"></option>
                                    </datalist> 
                                    </input>
                                </p>
                                <button type="button">Change</button>
                            </div>
                        </div>
                    </div> */}
                    
                    <div className="details-p">
                    <p>Last Modified:</p>
                    <p>10 December 2019 1:00 PM</p>
                    </div>
                    
                    <div className="details-p">
                    <p>File Size:</p>
                    <p>234 Kb</p>
                    </div>

                    <div className="details-p">
                    <p>Activity History:</p>
                    <p>Viewed By Emily Rose, 2 days ago</p>
                    <p>Edited By Emily Rose, 3 days ago</p>
                    <p>Edited By Dan Rose, 4 days ago</p>
                    </div>
                
                    <div className="details-p">
                        <a id="audit-trail" onClick={()=>(AuditTrail())}>(click to view detailed history)</a>
                    </div>
                
                    {/* <div id="popup2" className="overlay">
                        <div className="popup">
                            <h2>PDF-Sample.pdf</h2>
                            <a className="close" href="#">&times;</a>
                            <div className="content-n">
                                <h3>Detailed Document Audit History</h3>

                                <div id="audits">
                                    <div id="detail-audit1">
                                    <p className="detail1 new">Action</p>
                                    <p className="detail2 new">Viewed</p>
                                    <p className="detail3 new">Edited</p>
                                    <p className="detail4 new">Edited</p>
                                    <p className="detail5 new">Created</p>
                                    <p className="detail6 new">Edited</p>
                                    <p className="detail7 new">Created</p>
                                    <p className="detail8 new">Viewed</p>
                                    <p className="detail9 new">Edited</p>
                                    </div>

                                    <div id="detail-audit2">
                                    <p className="detail1">Person</p>
                                    <p className="detail2">Emily Rose</p>
                                    <p className="detail3">Emily Rose</p>
                                    <p className="detail4">Dan Rose</p>
                                    <p className="detail5">Dan Rose</p>
                                    <p className="detail6">Emily Rose</p>
                                    <p className="detail7">Emily Rose</p>
                                    <p className="detail8">Dan Rose</p>
                                    <p className="detail9">Dan Rose</p>
                                    </div>

                                    <div id="detail-audit3">
                                    <p className="detail1 new2">Date and Time</p>
                                    <p className="detail2 new2">12 Aug 2019 - 10:10 AM</p>
                                    <p className="detail3 new2">11 Aug 2019 - 10:10 PM</p>
                                    <p className="detail4 new2">10 Aug 2019 - 1:30 PM</p>
                                    <p className="detail5 new2">10 Aug 2019 - 1:10 PM</p>
                                    <p className="detail6 new2">12 Aug 2019 - 10:10 AM</p>
                                    <p className="detail7 new2">12 Aug 2019 - 10:10 AM</p>
                                    <p className="detail8 new2">12 Aug 2019 - 10:10 AM</p>
                                    <p className="detail9 new2">12 Aug 2019 - 10:10 AM</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div> */}
                
                    <div className="details-p">
                        <p>Current Version:</p>
                        <p>2.1</p>
                    </div>

                    <div className="details-p">
                        <p>Previous Versions:</p>
                        <p>2.0 - 2 days ago</p>
                        <p>1.1 - 3 days ago</p>
                        <p>1.0 - 4 days ago</p>
                    </div>
                
                </div>
            </div>
        </Fragment>
     ) }

export default DocumentDetails;