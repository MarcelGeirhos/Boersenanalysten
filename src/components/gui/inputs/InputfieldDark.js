import React from 'react';

// css imports
import './InputfieldDark.css';

const InputfieldDark = (props) => {
    return (
        <input type={props.type} className="inputfieldDark" placeholder={props.placeholder} />           
    );
}

export default InputfieldDark;