import React, { Fragment, useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from 'axios';

import LoginPage from "../Components/Login/Login"
import NavigationItems from "../Components/Navigation/NavigationItems/NavigationItems";
import MobileMenu from "../Components/MobileMenu/MobileMenu";
import Footer from "../Components/Footer/Footer";
import MyUploads from "../Components/MyUploads/MyUploads";
import Dashboard from "../Components/Dashboard/Dashboard";
import documentsList from "../Components/Documents/DocumentList";
import TrashDisplayFiles from "../Components/Trash/TrashDisplay"
import ManageShares from "../Components/ManageShares/ManageShares";
//import SharedWithMe from "../Components/sharedWithMe/sharedWithMe";
import ChangePassword from "../Components/ChangePassword/ChangePassword";
import SubDocument from "../Components/Documents/SubDocument/SubDocument";
import PdfViewer from "../Components/Documents/DocumentViewer/DocumentViewer";

import PrivateRoute from '../Utils/PrivateRoutes';

import './styles.scss';
import { getToken, removeUserLocal, setUserLocal } from "../Utils/Common";

const Routings = withRouter (({ location }) => {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
  })

  axios.get(`https://systest.eisenvault.net/alfresco/api/-default-/public/authentication/versions/1/tickets/-me-`,
  {headers:{
    Authorization: `Basic ${btoa(getToken())}`}
  }).then(response => {
    // setUserLocal(response.data.entry.userId, response.data.entry.id);
    setAuthLoading(false);
  }).catch(error => {
      removeUserLocal();
      setAuthLoading(false);
    }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return(
    <Fragment>
        <Route exact path="/" component={LoginPage} />
      <div>
        {location.pathname !== '/' && <MobileMenu />} 
      </div>

      <div className="main_body">
        {location.pathname !== '/' && <NavigationItems />}
      <div>

        <PrivateRoute path="/dashboard" component ={Dashboard} />
        <PrivateRoute path="/documentsList" component={documentsList} />
        <PrivateRoute path="/myUploads" component={MyUploads} />
        <PrivateRoute path="/trashDisplay" component={TrashDisplayFiles} />
        <PrivateRoute path="/manageShares" component={ManageShares} />
        {/* <PrivateRoute path="/sharedWithMe" component={SharedWithMe} /> */}
        <PrivateRoute path="/changePassword" component={ChangePassword} />
        <PrivateRoute path="/document/:id" component={SubDocument} />
        <PrivateRoute path="/doc/:id/:name" component={PdfViewer} />
        {location.pathname !== '/' &&  <Footer />}
      </div>
      </div>

    </Fragment>
  )
}
)

export default Routings;