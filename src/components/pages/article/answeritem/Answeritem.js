import React from 'react';

// own module imports
import AnswerVoting from '../voting/answerVoting/AnswerVoting';

// css imports
import './Answeritem.css';

// third party imports
import { Link } from 'react-router-dom';

const Answeritem = (props) => {
    return (
        <div className="answeritem">
            <AnswerVoting voting={props.voting} id={props.id} />
            <p className="answertext">{props.answerText}</p>
            <div className="user-info-section">
                <p>{props.createdAt}</p>
                <Link to={{pathname: `/userprofile/${props.creatorId}`}}>
                    <p>{props.creator}</p>
                </Link>
            </div>
        </div>
    );
}

export default Answeritem;