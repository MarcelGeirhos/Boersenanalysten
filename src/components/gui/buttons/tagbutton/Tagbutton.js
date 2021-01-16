import React from 'react';

// css imports
import './Tagbutton.css';

// third party imports
import { Link } from 'react-router-dom';

const Tagbutton = (props) => {
    return (
        <Link to={props.link}>
            <button className="tag-button" onClick={props.onClick}>{props.children}</button>
        </Link>
    );
}

export default Tagbutton;