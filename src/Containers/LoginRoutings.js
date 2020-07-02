import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import LoginPage from "../Components/Login/Login";

const LoginRoutings = () => {
    return  <Router>
          <Route exact path="/" component={LoginPage} />
          </Router>;
}

export default LoginRoutings;