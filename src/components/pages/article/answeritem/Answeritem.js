import React from 'react';

// css imports
import './Answeritem.css';

const Answeritem = (props) => {
    return (
        <div className="answeritem">
            <p>{props.answerText}</p>
            <p>{props.voting} Votes</p>
        </div>
    );
}

export default Answeritem;