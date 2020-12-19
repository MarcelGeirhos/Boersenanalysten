import React from 'react';

// css imports
import './Secondbutton.css';

// third party imports
import { Link } from 'react-router-dom';

const Secondbutton = (props) => {
    return (
        <Link to={props.link}>
            <button className="second-button">{props.children}</button>
        </Link>
    );
}

export default Secondbutton;