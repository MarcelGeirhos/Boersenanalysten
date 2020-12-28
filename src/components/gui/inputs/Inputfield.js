import React from 'react';

// css imports
import './Inputfield.css';

const Inputfield = (props) => {
    return (
        <input
            type={props.type}
            className="inputfield"
            placeholder={props.placeholder}
            onChange={props.onChange}
            maxlength={props.maxlength} />
    );
}

export default Inputfield;