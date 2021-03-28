import React, { useState, useEffect } from 'react';

// own module imports
import UserprofileNavigation from '../UserprofileNavigation';
import Mainbutton from '../../../gui/buttons/mainbutton/Mainbutton';
import Timelineitem from '../../userprofile/portfolioHistory/timelineitem/Timelineitem';

// css imports
import './PortfolioHistoryPage.css';

// third party imports
import firebase from 'firebase/app';
import { useParams } from "react-router-dom";

// material-ui imports
import { Timeline } from '@material-ui/lab';

function PortfolioHistoryPage() {
    const { id } = useParams();
    const [articleRefList, setArticleRefList] = useState([]);
    const [portfolioArticleList, setPortfolioArticleList] = useState([]);
    const [articleDataList, setArticleDataList] = useState([]);
    const [portfolioArticle, setPortfolioArticle] = useState([]);
    const [articleCreatedAt, setArticleCreatedAt] = useState("");
    const dateOptions = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'};

    useEffect(() => {
        const fetchData = async () => {
            const userPortfolioArticleList = await firebase.firestore().collection('users').doc(id).collection('portfolioArticles').get();
            userPortfolioArticleList.forEach(async (doc) => {
                const portfolioArticles = await firebase.firestore().collection('users').doc(id).collection('portfolioArticles').doc(doc.data().id).get();
                setPortfolioArticle(portfolioArticles);
                portfolioArticles.data().portfolioArticleRefs.forEach(async (doc) => {
                    const portfolioArticle = await firebase.firestore().collection('articles').doc(doc.id).get();
                    setPortfolioArticleList(portfolioArticleList => [...portfolioArticleList, portfolioArticle.data()]);
                })
            })
        }
        fetchData();  
            
            //const userPortfolioArticles = await firebase.firestore().collection('users').doc(id).collection('portfolioArticles').get();
            //setPortfolioArticleList(userPortfolioArticles.docs.map(doc => ({...doc.data()})));
            //portfolioArticleList.map((portfolioArticle) => {
            //    console.log(portfolioArticle.portfolioArticleRefs);
            // });
            /*const articleRefData = await firebase.firestore().collection('users').doc(id).collection('portfolioArticles').doc(userData.data().portfolioArticleSubColIds[0]).get();
            console.log(articleRefData.data().length);
            setArticleRefList({...articleRefData.data().portfolioArticleRefs});
            // TODO hier weitermachen length = 0? warum?
            console.log(articleRefList.length);
           
            /*articleRefData.docs.map(async (doc) => {
                const articleData = await firebase.firestore().collection('articles').doc(doc.data().articleRef.id).get();
                setArticleDataList(articleDataList => [...articleDataList, articleData.data()]);
                setArticleCreatedAt(articleDataList => [...articleDataList, articleData.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions)]);
            })*/
        
        /*const fetchData2 = async () => {
            console.log(portfolioArticleList);
            portfolioArticleList.map(async (ref) => {
                console.log(ref.id);
                const articleData = await firebase.firestore().collection('articles').doc(ref.id).get();
                setArticleDataList(articleDataList => [...articleDataList, articleData.data()]);
                //setArticleCreatedAt(articleDataList => [...articleDataList, articleData.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions)]);
            })
        }
        fetchData2();*/
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let portfolioTimelineHeader;
    if (portfolioArticleList.length === 0) {
        portfolioTimelineHeader = (
            <div className="empty-portfolio-timeline">
                <h2>Erstelle deinen ersten Portfolio Beitrag</h2>
                <Mainbutton link="/createArticle">Portfolio Beitrag erstellen</Mainbutton>
            </div>
        )
    } else {
        portfolioTimelineHeader = (
            <div className="no-empty-portfolio-timeline">
                <Mainbutton link="/createArticle">Portfolio Beitrag erstellen</Mainbutton>
            </div>
        )
    }

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <div className="portfolio-timeline">
                <Timeline align="alternate">
                    { portfolioTimelineHeader }
                    {
                        portfolioArticleList.map((article) => (
                            <Timelineitem 
                                id={article.id}
                                title={article.title}
                                voting={article.voting}
                                answerCounter={article.answerCounter}
                                views={article.views}/>
                        ))
                    }
                </Timeline>
            </div>
        </div>
    );
}

export default PortfolioHistoryPage;