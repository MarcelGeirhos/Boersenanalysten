import React from 'react';

// css imports
import './AnswerListitem.css';

// third party imports
import { Link } from 'react-router-dom';

const AnswerListitem = (props) => {
    return (
        <div className="answer-list-item">
            {/* TODO key={props.key} implementieren in li Element? */}
            <div className="answer-list-item-left-section">
                <p>{props.voting}<br/>Voting</p>
            </div>
            <div className="answer-list-item-right-section">
                <Link to={{pathname: `/article/${props.id}`}}>
                    {props.title}
                </Link>
                
            </div>
            <div className="created-at-section">
                <p>{props.createdAt}</p>
            </div>
        </div>
    );
}

export default AnswerListitem;