import React, { useState, useEffect } from 'react';

// own module imports
import firebaseConfig from '../../../../firebase/Config';
import UserprofileNavigation from '../UserprofileNavigation';
import AnswerListitem from './../../../gui/outputs/answerListitem/AnswerListitem';
import ArticleListitem from './../../../gui/outputs/articleListitem/ArticleListitem';

// css imports
import './UserActivityPage.css';

// third party imports
import firebase from 'firebase/app';

// material-ui imports
import {
    Button,
    ButtonGroup
} from '@material-ui/core';

function UserActivityPage() {
    const [listData, setListData] = useState([]);
    const [articleListData, setArticleListData] = useState([]);
    const [createdAt, setCreatedAt] = useState("");
    const [isAnswer, setIsAnswer] = useState(false);
    //const [selectedSortButton, setSelectedSortButton] = useState(0);
    const [selectedFilterButton, setSelectedFilterButton] = useState(0);
    const dateOptions = { year: '2-digit', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'};

    useEffect(() => {
        firebaseConfig.getUserState().then(user => {
            const fetchData = async () => {
                await firebase.firestore().collection('users').doc(user.uid).get().then(
                    () => {
                        setListValues("articles");
                    }).catch(error => {
                        console.log('Error getting userData ', error);
                    })
                }
                fetchData();
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setListValues = async (collection, voting = "") => {
        //const sortCriteria = sortList();
        firebaseConfig.getUserState().then(user => {
            const fetchData = async () => {
                await firebase.firestore().collection('users').doc(user.uid).get();
                    setListData([]);
                    const dataList = await firebase.firestore().collection('users').doc(user.uid).collection(collection).get();
                    dataList.forEach(async (doc) => {
                        const data = await firebase.firestore().collection('users').doc(user.uid).collection(collection).doc(doc.data().id).get();
                        if (collection === "articles") {
                            setIsAnswer(false);
                            setSelectedFilterButton(0);
                            data.data().articleRefs.forEach(async (doc) => {
                                const articleData = await firebase.firestore().collection('articles').doc(doc.id).get();
                                if (articleData.data() != null) {
                                    setListData(listData => [...listData, articleData.data()]);
                                    setCreatedAt(listData => [...listData, articleData.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions)]);
                                }
                            })
                        } else if (collection === "answers") {
                            setIsAnswer(true);
                            setSelectedFilterButton(1);
                            data.data().answerRefs.forEach(async (doc) => {
                                const articleData = await firebase.firestore().collection('articles').doc(doc.path.substring(9, 29)).get();
                                if (articleData.data() != null) {
                                    setArticleListData(articleListData => [...articleListData, articleData.data()]);                       
                                    const answerData = await firebase.firestore().collection('articles').doc(doc.path.substring(9, 29)).collection('answers').doc(doc.id).get();
                                    setListData(listData => [...listData, answerData.data()]);
                                    setCreatedAt(listData => [...listData, answerData.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions)]);
                                }
                            })
                        } else if (collection === "votings" && voting === "upVotings") {
                            setIsAnswer(false);
                            setSelectedFilterButton(2);
                            data.data().upVotingRefs.forEach(async (doc) => {
                                const articleData = await firebase.firestore().collection('articles').doc(doc.id).get();
                                if (articleData.data() != null) {
                                    setListData(listData => [...listData, articleData.data()]);
                                    setCreatedAt(listData => [...listData, articleData.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions)]);
                                }
                            })
                        } else if (collection === "votings" && voting === "downVotings") {
                            setIsAnswer(false);
                            setSelectedFilterButton(3);
                            data.data().downVotingRefs.forEach(async (doc) => {
                                const articleData = await firebase.firestore().collection('articles').doc(doc.id).get();
                                if (articleData.data() != null) {
                                    setListData(listData => [...listData, articleData.data()]);
                                    setCreatedAt(listData => [...listData, articleData.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions)]);
                                }
                            })
                        }
                        console.log(data.data());
                        // TODO hier weitermachen und Liste sortiert ausgeben
                        //console.log(listData[0].createdAt.seconds);
                        //listData.sort((a, b) => new Date(a.createdAt).getSeconds() - new Date(b.createdAt).getSeconds());
                    })
                }
                fetchData();
            })
    }

    /*const sortList = (selectedButton) => {
        if (selectedButton === 0) {
            setSelectedSortButton(0);
            return "createdAt";
        } else if (selectedButton === 1) {
            setSelectedSortButton(1);
            return "voting";
        }
    }*/

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation selectedTab={1} />
            <div className="user-activity-page">
                <div className="user-activity-selection">
                    <h2>Aktivität</h2>
                    <div className="button-groups">
                        <ButtonGroup color="primary" size="small">
                            <Button onClick={() => setListValues("articles")} color={selectedFilterButton === 0 ? "secondary" : "primary"}>Beiträge</Button>
                            <Button onClick={() => setListValues("answers")} color={selectedFilterButton === 1 ? "secondary" : "primary"}>Antworten</Button>
                            <Button onClick={() => setListValues("votings", "upVotings")} color={selectedFilterButton === 2 ? "secondary" : "primary"}>Up Votings</Button>
                            <Button onClick={() => setListValues("votings", "downVotings")} color={selectedFilterButton === 3 ? "secondary" : "primary"}>Down Votings</Button>
                        </ButtonGroup>
                        <ButtonGroup color="primary" size="small" variant="text">
                            <Button /*onClick={() => sortList(0)} color={selectedSortButton === 0 ? "secondary" : "primary"}*/>Neuste</Button>
                            <Button /*onClick={() => sortList(1)} color={selectedSortButton === 1 ? "secondary" : "primary"}*/>Voting</Button>
                        </ButtonGroup>
                    </div>
                </div>
                {
                    isAnswer === false ?
                        listData.map((article, index) => (
                            <div key={index}>
                                <ArticleListitem id={article.id}
                                    title={article.title}
                                    tags={article.tags}
                                    voting={article.voting}
                                    answerCounter={article.answerCounter}
                                    views={article.views}
                                    creator={article.creator}
                                    creatorId={article.creatorId}
                                    createdAt={createdAt[index]} />
                            </div>
                        )) 
                    : 
                    listData.map((answer, index) => (
                        <div key={index}>
                            <AnswerListitem
                                id={articleListData[index].id}
                                title={articleListData[index].title}
                                creator={articleListData[index].creator}
                                creatorId={articleListData[index].creatorId}
                                voting={answer.voting} 
                                createdAt={createdAt[index]} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default UserActivityPage;