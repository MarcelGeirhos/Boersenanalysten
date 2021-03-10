import React from 'react';

// own module imports
import UserprofileNavigation from '../UserprofileNavigation';

// css imports
import './PortfolioHistoryPage.css';

// material-ui imports
import { 
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineSeparator
} from '@material-ui/lab';
import Paper from '@material-ui/core/Paper';

function PortfolioHistoryPage() {
    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <div className="portfolio-timeline">
                <Timeline align="alternate">
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <div className="portfolio-timeline-content">
                                Portfoliobeitrag 1
                            </div>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <div className="portfolio-timeline-content">
                                Portfoliobeitrag 2
                            </div>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <div className="portfolio-timeline-content">
                                Portfoliobeitrag 3
                            </div>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <div className="portfolio-timeline-content">
                                Portfoliobeitrag 4
                            </div>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <div className="portfolio-timeline-content">
                                Portfoliobeitrag 5
                            </div>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        </div>
    );
}

export default PortfolioHistoryPage;