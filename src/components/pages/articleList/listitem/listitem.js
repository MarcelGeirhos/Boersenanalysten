import React, { useState, useEffect } from 'react';

// own module imports
import Tagbutton from '../../../gui/buttons/tagbutton/Tagbutton';

// css imports
import './Listitem.css';

// third party imports
import { Link } from 'react-router-dom';

const Listitem = (props) => {
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        setTagList(props.tags);
    }, [props.tags])

    return (
        <div className="listitem">
            {/* TODO key={props.key} implementieren in li Element? */}
            <div className="listitem-left-section">
                <p>{props.voting}<br/>Voting</p>
                <p>{props.answerCounter}<br/>Antworten</p>
                <p>{props.views}<br/>Ansichten</p>
            </div>
            <div className="listitem-right-section">
                <Link to={{pathname: `/article/${props.id}`}}>
                    <p>{props.title}</p>
                </Link>
                {
                tagList.map(tag => (
                    <Tagbutton>{tag}</Tagbutton>
                ))
                }
            </div>
        </div>
    );
}

export default Listitem;