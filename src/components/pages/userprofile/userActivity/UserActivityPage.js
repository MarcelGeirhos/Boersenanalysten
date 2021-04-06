import React, { useState, useEffect } from 'react';

// own module imports
import UserprofileNavigation from '../UserprofileNavigation';
import Listitem from '../../articleList/listitem/Listitem';
import firebaseConfig from '../../../../firebase/Config';

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
    const [userData, setUserData] = useState([]);
    const [list, setList] = useState([]);
    const [articleCreatedAt, setArticleCreatedAt] = useState("");
    const [isAnswer, setIsAnswer] = useState(false);
    const dateOptions = { year: '2-digit', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'};

    useEffect(() => {
        firebaseConfig.getUserState().then(user => {
            const fetchData = async () => {
                await firebase.firestore().collection('users').doc(user.uid).get().then(
                    () => {
                        setListData("articles");
                    }).catch(error => {
                        console.log('Error getting userData ', error);
                    })
                }
                fetchData();
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setListData = async (collection, voting = "") => {
        firebaseConfig.getUserState().then(user => {
            const fetchData = async () => {
                await firebase.firestore().collection('users').doc(user.uid).get();
                    setList([]);
                    const dataList = await firebase.firestore().collection('users').doc(user.uid).collection(collection).get();
                    dataList.forEach(async (doc) => {
                        const data = await firebase.firestore().collection('users').doc(user.uid).collection(collection).doc(doc.data().id).get();
                        if (collection === "articles") {
                            setIsAnswer(false);
                            data.data().articleRefs.forEach(async (doc) => {
                                const articleData = await firebase.firestore().collection('articles').doc(doc.id).get();
                                setList(list => [...list, articleData.data()]);
                                setArticleCreatedAt(list => [...list, articleData.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions)]);
                            })
                        } else if (collection === "answers") {
                            setIsAnswer(true);
                            data.data().answerRefs.forEach(async (doc) => {                           
                                const answerData = await firebase.firestore().collection('articles').doc(doc.path.substring(9, 29)).collection('answers').doc(doc.id).get();
                                setList(list => [...list, answerData.data()]);
                                setArticleCreatedAt(list => [...list, answerData.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions)]);
                            })
                        } else if (collection === "votings" && voting === "upVotings") {
                            setIsAnswer(false);
                            data.data().upVotingRefs.forEach(async (doc) => {
                                const articleData = await firebase.firestore().collection('articles').doc(doc.id).get();
                                setList(list => [...list, articleData.data()]);
                                setArticleCreatedAt(list => [...list, articleData.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions)]);
                            })
                        } else if (collection === "votings" && voting === "downVotings") {
                            setIsAnswer(false);
                            data.data().downVotingRefs.forEach(async (doc) => {
                                const articleData = await firebase.firestore().collection('articles').doc(doc.id).get();
                                setList(list => [...list, articleData.data()]);
                                setArticleCreatedAt(list => [...list, articleData.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions)]);
                            })
                        }
                        console.log(data.data());
                    })
                }
                fetchData();
            })
    }

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation selectedTab={1} />
            <div className="user-activity-page">
                <h2>Aktivität</h2>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button onClick={() => setListData("articles")}>Beiträge</Button>
                    <Button onClick={() => setListData("answers")}>Antworten</Button>
                    <Button onClick={() => setListData("votings", "upVotings")}>Up Votings</Button>
                    <Button onClick={() => setListData("votings", "downVotings")}>Down Votings</Button>
                </ButtonGroup>
                {
                    isAnswer === false ?
                        list.map((article, index) => (
                            <div key={index}>
                                <Listitem id={article.id}
                                    title={article.title}
                                    tags={article.tags}
                                    voting={article.voting}
                                    answerCounter={article.answerCounter}
                                    views={article.views}
                                    creator={article.creator}
                                    creatorId={article.creatorId}
                                    createdAt={articleCreatedAt[index]} />
                            </div>
                        ))
                    : 
                    list.map((answer, index) => (
                        <div key={index}>
                            {/*<p>{answer.id}</p>*/}
                            <p>{answer.answerText}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default UserActivityPage;