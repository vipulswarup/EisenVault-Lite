import React, { Fragment } from "react";
import './styles.scss';
import { HashRouter as Router } from "react-router-dom";

import Routings from './Routings';

const App = () => {
  return (
    <Fragment>
      <Router>
        <Routings />
      </Router>
    </Fragment>
  )
}

export default App;
