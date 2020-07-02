import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import NavigationItems from "../Components/Navigation/NavigationItems/NavigationItems";
import MobileMenu from "../Components/MobileMenu/MobileMenu"

import MyUploads from "../Components/MyUploads/MyUploads";
import Dashboard from "../Components/Dashboard/Dashboard";
import documentsList from "../Components/Documents/DocumentList";
import LoginPage from "../Components/Login/Login"

import TrashDisplayFiles from "../Components/Trash/TrashDisplay"

import ManageShares from "../Components/ManageShares/ManageShares";
import ChangePassword from "../Components/ChangePassword/ChangePassword";

import './styles.scss';

const Routings = () => {
  return  <Router>
        <Route exact path="/" component={LoginPage} /> 

    {/* <Switch> */}
    <div>
    <MobileMenu />
    </div>
    
    <div className="main_body">

        <NavigationItems />
        <Route path="/dashboard" exact component ={Dashboard} />
        <Route path="/documentsList" component={documentsList} />
        <Route path="/myUploads" component={MyUploads} />

        <Route path="/trashDisplay" component={TrashDisplayFiles} />

        <Route path="/manageShares" component={ManageShares} />
        <Route path="/changePassword" component={ChangePassword} />

    </div>
   {/* </Switch> */}
  </Router>;
}

export default Routings;
