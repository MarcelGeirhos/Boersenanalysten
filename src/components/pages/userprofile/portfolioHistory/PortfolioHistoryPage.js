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
            <Timeline align="alternate">
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Paper elevation={3} className="paper">
                            Portfoliobeitrag 1
                        </Paper>
                    </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Portfoliobeitrag 2</TimelineContent>
                </TimelineItem>

                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Portfoliobeitrag 3</TimelineContent>
                </TimelineItem>

                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Portfoliobeitrag 4</TimelineContent>
                </TimelineItem>
            </Timeline>
        </div>
    );
}

export default PortfolioHistoryPage;