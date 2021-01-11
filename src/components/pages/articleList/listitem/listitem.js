import React from 'react';

// css imports
import './Listitem.css';

// third party imports
import { Link } from 'react-router-dom';

const Listitem = (props) => {
    return (
        <div className="listitem">
            {/* TODO key={props.key} implementieren in li Element? */}
            <div className="listitem-left-section">
                <p>{props.voting}<br/>Votes</p>
                <p>{props.answerCounter}<br/>Antworten</p>
                <p>{props.views}<br/>Ansichten</p>
            </div>
            <div className="listitem-right-section">
                <Link to={{pathname: `/article/${props.id}`}}>
                    <p>{props.title}</p>
                </Link>
                <p>{props.tags}</p>
            </div>
        </div>
    );
}

export default Listitem;