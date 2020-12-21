import React from 'react';

import './InputfieldDark.css';

const InputfieldDark = (props) => {
    return (
        <input type={props.type} className="inputfieldDark" placeholder={props.placeholder} />           
    );
}

export default InputfieldDark;