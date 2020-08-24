import React , { Fragment,useState,useEffect } from 'react';
import "./DocumentDetails.scss"

function DocumentDetails()  {
    return(
        <Fragment>
            <div id="pdf-preview">
                <div id="details-pdf" class="pdf_details">
                    <div class="details-p">
                        <a class="close" href="pdf_preview.html">&times;</a>
                        <a href="doc_share.html" class="share-file">
                            <i class="flaticon-share"></i>Click here to share</a> 
                    
                    <p class="top-heaading">Category:</p>
                    <p>Aadhaar Card <a class="pdf-link" href="#popup1">
                        (click here to change)</a></p>
                    </div>

                    <div id="popup1" class="overlay">
                        <div class="popup-n">
                            <h2>PDF-Sample.pdf</h2>
                            <a class="close" href="#">&times;</a>
                            <div class="content">
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
                    </div>
                    
                    <div class="details-p">
                    <p>Last Modified:</p>
                    <p>10 December 2019 1:00 PM</p>
                    </div>
                    
                    <div class="details-p">
                    <p>File Size:</p>
                    <p>234 Kb</p>
                    </div>

                    <div class="details-p">
                    <p>Activity History:</p>
                    <p>Viewed By Emily Rose, 2 days ago</p>
                    <p>Edited By Emily Rose, 3 days ago</p>
                    <p>Edited By Dan Rose, 4 days ago</p>
                    </div>
                
                    <div class="details-p">
                        <a id="audit-trail" href="#popup2">(click to view detailed history)</a>
                    </div>
                
                    <div id="popup2" class="overlay">
                        <div class="popup">
                            <h2>PDF-Sample.pdf</h2>
                            <a class="close" href="#">&times;</a>
                            <div class="content-n">
                                <h3>Detailed Document Audit History</h3>

                                <div id="audits">
                                    <div id="detail-audit1">
                                    <p class="detail1 new">Action</p>
                                    <p class="detail2 new">Viewed</p>
                                    <p class="detail3 new">Edited</p>
                                    <p class="detail4 new">Edited</p>
                                    <p class="detail5 new">Created</p>
                                    <p class="detail6 new">Edited</p>
                                    <p class="detail7 new">Created</p>
                                    <p class="detail8 new">Viewed</p>
                                    <p class="detail9 new">Edited</p>
                                    </div>

                                    <div id="detail-audit2">
                                    <p class="detail1">Person</p>
                                    <p class="detail2">Emily Rose</p>
                                    <p class="detail3">Emily Rose</p>
                                    <p class="detail4">Dan Rose</p>
                                    <p class="detail5">Dan Rose</p>
                                    <p class="detail6">Emily Rose</p>
                                    <p class="detail7">Emily Rose</p>
                                    <p class="detail8">Dan Rose</p>
                                    <p class="detail9">Dan Rose</p>
                                    </div>

                                    <div id="detail-audit3">
                                    <p class="detail1 new2">Date and Time</p>
                                    <p class="detail2 new2">12 Aug 2019 - 10:10 AM</p>
                                    <p class="detail3 new2">11 Aug 2019 - 10:10 PM</p>
                                    <p class="detail4 new2">10 Aug 2019 - 1:30 PM</p>
                                    <p class="detail5 new2">10 Aug 2019 - 1:10 PM</p>
                                    <p class="detail6 new2">12 Aug 2019 - 10:10 AM</p>
                                    <p class="detail7 new2">12 Aug 2019 - 10:10 AM</p>
                                    <p class="detail8 new2">12 Aug 2019 - 10:10 AM</p>
                                    <p class="detail9 new2">12 Aug 2019 - 10:10 AM</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                
                    <div class="details-p">
                        <p>Current Version:</p>
                        <p>2.1</p>
                    </div>

                    <div class="details-p">
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