import React from 'react';

// own module imports
import Voting from '../voting/Voting';

// css imports
import './Answeritem.css';

const Answeritem = (props) => {
    return (
        <div className="answeritem">
            <p>{props.answerText}</p>
            <p>{props.voting} Votes</p>
            <Voting voting={props.voting} />
        </div>
    );
}

export default Answeritem;