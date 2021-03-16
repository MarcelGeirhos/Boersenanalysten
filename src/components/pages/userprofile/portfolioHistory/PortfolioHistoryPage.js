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
    const [portfolioArticleList, setPortfolioArticleList] = useState([]);
    const [portfolioArticleData, setPortfolioArticleData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const portfolioArticleData = await firebase.firestore().collection('users').doc(id).collection('portfolioArticles').get();
            setPortfolioArticleList(portfolioArticleData.docs.map(doc => ({...doc.data()})));
            portfolioArticleData.docs.map(async (doc) => {
                const articleData = await firebase.firestore().collection('articles').doc(doc.data().articleRef.id).get();
                setPortfolioArticleData(articleData);
                console.log(articleData.data().title);
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
                        // TODO alle Portfolio Beiträge anzeigen lassen.
                        //portfolioArticleData.map((portfolioArticle, index) => {
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <div className="portfolio-timeline-content">
                                       <p>{portfolioArticleData.data().title}</p>
                                    </div>
                                </TimelineContent>
                            </TimelineItem>
                        })
                    }
                    
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