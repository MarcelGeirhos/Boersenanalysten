import React from 'react';

// css imports
import './Timelineitem.css';

// third party imports
import { Link } from 'react-router-dom';

// material-ui imports
import {
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineSeparator
} from '@material-ui/lab';

const Timelineitem = (props) => {
    return (
        <TimelineItem>
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <div className="portfolio-timeline-content">
                    <Link to={{pathname: `/article/${props.id}`}}>
                        <p>{props.title}</p>
                    </Link>
                    <div className="portfolio-article-stats">
                        <p>{props.voting}<br/>Voting</p>
                        <p>{props.answerCounter}<br/>Antworten</p>
                        <p>{props.views}<br/>Ansichten</p>
                    </div>
                    <p className="portfolio-created-at">{props.createdAt}</p>
                </div>
            </TimelineContent>
        </TimelineItem>
    );
}

export default Timelineitem;