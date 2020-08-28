import React , { Fragment,useRef,useEffect, useState } from 'react';
import "./MoreDetails.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShareAlt} from "@fortawesome/free-solid-svg-icons"
import {instance} from "../ApiUrl/endpointName.instatnce"
import { useHistory } from "react-router-dom";
import {getToken} from "../../Utils/Common";
import Axios from 'axios';
import Modal from '../Modal/Modal';

import useOutsideClick from '../Backdrop/OutsideClick';
import { MoreDetailToggleButton } from '../MobileMenu/MobileMenu';
import {ChangeTypes, AuditDetails} from "../Modal/DeleteModalSumm/DeleteSumm"

const DocumentDetails = (props) => {
    const ref = useRef();
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [auditIsOpen, setAuditIsOpen] = useState(false);

    const [docTypes, setDocTypes] = useState([]);
    const [docSize, setDocSize] = useState([]);
    const [modificationDate, setmodificationDate] = useState([]);
    const [documentType, setDocumentType] = useState([]);
    const [currentVersion, setCurrentVersion] = useState([]);
    const [latestVersion, setLatestVersion] = useState([]);
    const [olderVersion, setOlderVersion] = useState([]);

    const [auditDetails, setAuditDetails] = useState([])
    const [fullAuditDetails, setFullAuditDetails] = useState([])

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

    function bytesToSize(bytes, seperator = "") {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return 'n/a'
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
        if (i === 0) return `${bytes}${seperator}${sizes[i]}`
        return `${(bytes / (1024 ** i)).toFixed(1)}${seperator}${sizes[i]}`
      }

      const closeModal=()=>{ 
        //function to close modal after performing it's operations
      return (setmodalIsOpen(false)
      // setPasswordHandler(false)
      )
    }

    useEffect(()=>{
        DocDetails();
    },[])

    function DocDetails(){
        instance.get(`/nodes/${id}`,
        {
            headers: {
              Authorization: `Basic ${btoa(getToken())}`,
           }
          }).then((response) => {
            console.log(response.data.entry)
            setmodificationDate(response.data.entry.modifiedAt.split('T')[0])
            setDocumentType(response.data.entry.nodeType.split(':')[1])
            setDocSize(response.data.entry.content)
    })}

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
              console.log(response.data.types[0])
            //   closeModal();

              setDocTypes(                <select>
               {response.data.map(({documentTypes, i})=>
                    <option key={i}>
                    {documentTypes.value}</option>
            )}
            </select>
        )})
    }


    useEffect(()=>{AuditTrail()}, [])

    function AuditTrail(){
        Axios.get(`https://systest.eisenvault.net/alfresco/s/ev/nodeaudittrail?nodeRef=workspace://SpacesStore/${id}`,
        {
            headers: {
              Authorization: `Basic ${btoa(getToken())}`,
           },
          }).then((response)=>{
              let MoreData=response.data;
              console.log(MoreData)

        setFullAuditDetails(MoreData.data.map(d=>{
            return{
            timeF: d.time.split('T')[0],
            actionF: d.method,
            userF: d.userName.split('.')[0]
            }
        }))


        setAuditDetails(MoreData.data.slice(0,5).map(d=>{
                    return{
                    time: d.time.split('T')[0],
                    action: d.method,
                    user: d.userName.split('.')[0]
                    }
                }))
          })}

    useEffect(()=>{versions()},[])

    function versions() {
    instance.get(`/nodes/${id}/versions`,
    {
        headers: {
          Authorization: `Basic ${btoa(getToken())}`,
       },
      }).then((response)=>{
            setLatestVersion(response.data.list.entries[0])
            setCurrentVersion(response.data.list.entries.map((d)=>{
                console.log(d.entry.id)
              return{
                  curretVersionId: d.entry.id
              }
          }))
    })
    }

    return(
        <Fragment>
            <div className={detailclasses}>
                <div id="details-pdf" className="pdf_details">
                    <div className="details-p" ref={ref} >
                        {/* <button onClick={() => history.goBack()}>&times;</button> */}

                        <button onClick={()=> (DocumentShare())}>
                        <FontAwesomeIcon className="Icon" icon={faShareAlt}/>Click here to share</button> 
                    
                <Modal show={modalIsOpen}>
                
                <ChangeTypes   
                documentType ={documentType}                
                changeType={ChangeDocType}
                clicked={() => setmodalIsOpen(false)}
                docTypes={docTypes}>
                </ChangeTypes>
              </Modal> 

                    <p className="top-heaading">Category:</p>
                    <p>{documentType} 
                    <a className="pdf-link" onClick={() => 
                    {return(setmodalIsOpen(true)
                    )}}>
                        (click here to change)</a></p>
                    </div>

                    <div className="details-p">
                    <p>Last Modified: {modificationDate}</p>
                    </div>
                    
                    <div className="details-p">
                    <p>File Size: {bytesToSize(docSize.sizeInBytes)}</p>
                    </div>

                    <div className="details-p">
                    <p>Activities:</p>  
                    {auditDetails.map((audit) =>(
                        <p> {audit.action} by {audit.user} on {audit.time}</p>
                    ))}
                    </div>

                <Modal show={auditIsOpen}>
                
                <AuditDetails  
                clicked={() => setAuditIsOpen(false)}
                // action={actionF}
                // user={userF}
                // time={timeF}
                    >
                </AuditDetails>
              </Modal> 

                    <div className="details-p">
                       <p> <a id="audit-trail" onClick={() => 
                        {return(setAuditIsOpen(true)
                        )}}>
                        (click to view detailed history)</a></p>
                    </div> 

                    <div className="details-p">
                        <p>Current Version:</p>
                        {currentVersion.map((versionId)=>
                        ( <p>{versionId.curretVersionId}</p>
                        ))}
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

                    {/* <div className="details-p">
                        <p>Previous Versions:</p>
                        <p>2.0 - 2 days ago</p>
                        <p>1.1 - 3 days ago</p>
                        <p>1.0 - 4 days ago</p>
                    </div> */}
                
                </div>
            </div>
        </Fragment>
     ) }

export default DocumentDetails; 