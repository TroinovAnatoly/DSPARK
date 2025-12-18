import React from 'react';
import {Link} from 'react-router-dom';

function Footer() {
    return(
    <footer>
        <p id="footer_text">
          <Link to="/company">О компании DSPARK</Link>
        </p>
    </footer> 
    )
}

export default Footer;