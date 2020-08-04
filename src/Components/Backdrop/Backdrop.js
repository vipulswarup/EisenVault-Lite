import React from 'react';
import './Backdrop.scss';

const Backdrop=(props)=>(
    props.show ? <div className="Backdrop"></div>:null
);

export default Backdrop;