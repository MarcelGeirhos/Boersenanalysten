import React from 'react';

// css imports
import './Mainbutton.css';

// third party imports
import { Link } from 'react-router-dom';

function Mainbutton(props) {
    return (
        <Link to={props.link}>
            <button className="main-button" onClick={props.onClick}>{props.children}</button>
        </Link>
    )
}

export default Mainbutton;