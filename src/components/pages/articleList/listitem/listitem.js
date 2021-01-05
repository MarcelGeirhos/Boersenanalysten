import React from 'react';

// css imports
import './Listitem.css';

// third party imports
import { Link } from 'react-router-dom';

const Listitem = (props) => {
    return (
        <div className="listitem">
            {/* TODO key={props.key} implementieren in li Element? */}
            <li>
                <p>{props.voting} Voting {props.answerCounter} Antworten {props.views} Ansichten</p>
                <Link to={{pathname: `/article/${props.id}`}}>
                    <p>{props.title}</p>
                </Link>
                <p>{props.tags}</p>
            </li>
        </div>
    );
}

export default Listitem;