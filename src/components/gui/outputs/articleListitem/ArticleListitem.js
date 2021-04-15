import React, { useState, useEffect } from 'react';

// own module imports
import Tagbutton from '../../buttons/tagbutton/Tagbutton';

// css imports
import './ArticleListitem.css';

// third party imports
import { Link } from 'react-router-dom';

const ArticleListitem = (props) => {
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        setTagList(props.tags);
    }, [props.tags])

    return (
        <div className="listitem" key={props.key}>
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
                tagList.map((tag, index) => (
                    <Tagbutton key={index}>{tag}</Tagbutton>
                ))
                }
                <div className="creator-info-section">
                    <p>{props.createdAt} <Link to={{pathname: `/userprofile/${props.creatorId}`}}>{props.creator}</Link></p>
                </div>
            </div>
        </div>
    );
}

export default ArticleListitem;