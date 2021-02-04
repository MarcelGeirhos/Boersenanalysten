import React from 'react';

// own module imports
import AnswerVoting from '../voting/answerVoting/AnswerVoting';

// css imports
import './Answeritem.css';

const Answeritem = (props) => {
    return (
        <div className="answeritem">
            <AnswerVoting voting={props.voting} id={props.id} />
            <p className="answertext">{props.answerText}</p>
        </div>
    );
}

export default Answeritem;