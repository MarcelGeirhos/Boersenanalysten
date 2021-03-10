import React from 'react';

// css imports
import './Iconbutton.css';

// third party imports
import { Link } from 'react-router-dom';

function Iconbutton(props) {
    return (
        <Link to={props.link}>
            <button
                className="icon-button"
                onClick={props.onClick}>{props.children}</button>
        </Link>
    )
}

export default Iconbutton;