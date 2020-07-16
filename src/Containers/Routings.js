import React, { Fragment } from "react";
import { Route, withRouter } from "react-router-dom";

import LoginPage from "../Components/Login/Login"
import NavigationItems from "../Components/Navigation/NavigationItems/NavigationItems";
import MobileMenu from "../Components/MobileMenu/MobileMenu";
import Footer from "../Components/Footer/Footer";
import MyUploads from "../Components/MyUploads/MyUploads";
import Dashboard from "../Components/Dashboard/Dashboard";
import documentsList from "../Components/Documents/DocumentList";
import TrashDisplayFiles from "../Components/Trash/TrashDisplay"
import ManageShares from "../Components/ManageShares/ManageShares";
import SharedWithMe from "../Components/sharedWithMe/sharedWithMe";
import ChangePassword from "../Components/ChangePassword/ChangePassword";
import SubDocument from "../Components/Documents/SubDocument/SubDocument";
import PdfViewer from "../Components/Documents/DocumentViewer/DocumentViewer";

import './styles.scss';

const Routings = withRouter (({ location }) => {
  return(
    <Fragment>
        <Route exact path="/" component={LoginPage} />
      <div>
        {location.pathname !== '/' && <MobileMenu />} 
      </div>

      <div className="main_body">
        {location.pathname !== '/' && <NavigationItems />}
      <div>

        <Route path="/dashboard" component ={Dashboard} />
        <Route path="/documentsList" component={documentsList} />
        <Route path="/myUploads" component={MyUploads} />
        <Route path="/trashDisplay" component={TrashDisplayFiles} />
        <Route path="/manageShares" component={ManageShares} />
        <Route path="/sharedWithMe" component={SharedWithMe} />
        <Route path="/changePassword" component={ChangePassword} />
        <Route path="/document/:id" component={SubDocument} />
        <Route path="/doc/:id/:name" component={PdfViewer} />
        {location.pathname !== '/' &&  <Footer />}
      </div>
      </div>

    </Fragment>
  )
}
)

export default Routings;