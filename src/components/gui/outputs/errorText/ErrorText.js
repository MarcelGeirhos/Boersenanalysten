import React from 'react';

// css imports
import './ErrorText.css';

const ErrorText = (props) => {
    return (
        <p className="error-text" id={props.id}>{props.children}</p>
    );
}

export default ErrorText;