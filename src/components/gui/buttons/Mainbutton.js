import React from 'react';

import './Mainbutton.css';

// third party imports
import { Link } from 'react-router-dom';

const Mainbutton = (props) => {
    return (
        <Link to={props.link}>
            <button className="main-button">{props.children}</button>
        </Link>
    );
}

export default Mainbutton;