import React, { useState, useEffect } from 'react';

// own module imports
import UserprofileNavigation from '../UserprofileNavigation';

// css imports
import './PortfolioHistoryPage.css';

// third party imports
import firebase from 'firebase/app';
import { useParams } from "react-router-dom";

// material-ui imports
import { 
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineSeparator
} from '@material-ui/lab';

function PortfolioHistoryPage() {
    const { id } = useParams();
    const [articleDataList, setArticleDataList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const articleRefData = await firebase.firestore().collection('users').doc(id).collection('portfolioArticles').get();
            articleRefData.docs.map(async (doc) => {
                const articleData = await firebase.firestore().collection('articles').doc(doc.data().articleRef.id).get();
                setArticleDataList(articleDataList => [...articleDataList, articleData.data()]);
            })
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <div className="portfolio-timeline">
                <Timeline align="alternate">
                    {
                        articleDataList.map((article) => (
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <div className="portfolio-timeline-content">
                                        <p>{article.title}</p>
                                    </div>
                                </TimelineContent>
                            </TimelineItem>
                        ))
                    }
                </Timeline>
            </div>
        </div>
    );
}

export default PortfolioHistoryPage;