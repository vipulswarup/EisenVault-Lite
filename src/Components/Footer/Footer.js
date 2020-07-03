import React from 'react';
import Pagination from "../Pagination/Pagination";
import "./styleFooter.scss";

const Footer = () => (
    <footer className="base-footer">
      <Pagination/>

        <p className="footerSection">Copyright © 2020 
        <a href="https://eisenvault.com/">
          Argali Knowledge Services Pvt. Ltd., New Delhi, India</a></p>
      </footer>
);

export default Footer;