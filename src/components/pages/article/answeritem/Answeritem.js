import React from 'react';

// own module imports
import Voting from '../voting/Voting';

// css imports
import './Answeritem.css';

const Answeritem = (props) => {
    return (
        <div className="answeritem">
            <Voting voting={props.voting} />
            <p className="answertext">{props.answerText}</p>
        </div>
    );
}

export default Answeritem;