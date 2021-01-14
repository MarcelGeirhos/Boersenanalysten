import React from 'react';

// css imports
import './Voting.css';

// material-ui icon imports
import {
    ArrowDropUp,
    ArrowDropDown,
} from '@material-ui/icons';

const Voting = (props) => {
    return (
        <div className="voting-section">
            <button className="voting-button" /*onClick={() => editorButtonsHandler('bold')}*/><ArrowDropUp /></button>
            <p>{props.voting}</p>
            <button className="voting-button" /*onClick={() => editorButtonsHandler('bold')}*/><ArrowDropDown /></button>
        </div>
    );
}

export default Voting;