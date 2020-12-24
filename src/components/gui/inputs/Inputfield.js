import React from 'react';

import './Inputfield.css';

const Inputfield = (props) => {
    return (
        <input type={props.type} className="inputfield" placeholder={props.placeholder} />
    );
}

export default Inputfield;