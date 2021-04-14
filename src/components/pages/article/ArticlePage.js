import React, { useState, useEffect } from 'react';

// own module imports
import ChoiceDialog from '../../gui/outputs/dialogs/choiceDialog/ChoiceDialog';
import ArticleVoting from './voting/articleVoting/ArticleVoting';
import TextEditor from '../../gui/inputs/textEditor/TextEditor';
import Tagbutton from '../../gui/buttons/tagbutton/Tagbutton';
import ErrorText from '../../gui/outputs/errorText/ErrorText';
import firebaseConfig from '../../../firebase/Config';
import Answeritem from './answeritem/Answeritem';

// css imports
import './ArticlePage.css';

// third party imports
import firebase from 'firebase/app';
import {
    useParams,
    Redirect,
    Link,
} from "react-router-dom";

// material-ui imports
import { Button } from '@material-ui/core';

function ArticlePage() {
    const { id } = useParams();
    const [answer, setAnswer] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [userData, setUserData] = useState([]);
    const [answerList, setAnswerList] = useState([]);
    const [answerText, setAnswerText] = useState("");
    const [articleData, setArticleData] = useState("");
    const [articleText, setArticleText] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [routeRedirect, setRedirect] = useState(false);
    const [answerErrorText, setErrorAnswerText] = useState("");
    const [answerCreatedAt, setAnswerCreatedAt] = useState([]);
    const [articleCreatedAt, setArticleCreatedAt] = useState("");
    const dateOptions = { year: '2-digit', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' };

    useEffect(() => {
        const fetchData = async () => {
            // Artikel Daten werden ausgelesen und gesetzt
            const articleData = await firebase.firestore().collection('articles').doc(id).get();
            setArticleCreatedAt(articleData.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions));
            setArticleData({ ...articleData.data() });
            setTagList(articleData.data().tags);

            // Alle Antworten Daten werden ausgelesen und gesetzt
            const answerData = await firebase.firestore().collection('articles').doc(id).collection('answers').get();
            setAnswerCreatedAt(answerData.docs.map(doc => (doc.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions))));
            setAnswerList(answerData.docs.map(doc => ({ ...doc.data() })));

            // TODO Text mit richtiger Formatierung anzeigen lassen (probieren mit match, indexOf oder search)
            const articleTextWithHTML = articleData.data().articleText;
            console.log(articleTextWithHTML);
            if (articleTextWithHTML.match('<b>')) {
                document.execCommand('bold', false);
                console.log('Test');
            }
            setArticleText(articleTextWithHTML);

            // Aktuelle Benutzer Daten werden ausgelesen und gesetzt, wenn Benutzer eingeloggt ist.
            const user = firebase.auth().currentUser;
            if (user) {
                firebaseConfig.getUserState().then(user => {
                    const getUser = async () => {
                        await firebase.firestore().collection('users').doc(user.uid).get().then(
                            snapshot => {
                                setUserData(snapshot.data());
                            }).catch(error => {
                                console.log('Error getting userData ', error);
                            })
                        const answerList = await firebase.firestore().collection('users').doc(user.uid).collection('answers').get();
                            answerList.forEach(async (doc) => {
                            const answers = await firebase.firestore().collection('users').doc(user.uid).collection('answers').doc(doc.data().id).get();
                            setAnswer(answers.data());
                        })
                    }
                    getUser();
                })
            } else {
                // TODO muss noch implementiert werden
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [/*answerList*/]) // TODO auskommentieren führt zu sehr vielen Lesevorgängen.

    // Der Antwort Text wird mit allen Eigenschaften die vom
    // Benutzer mit dem Editor gesetzt wurden in die Datenbank
    // geschrieben z.B. fetter Text oder unnummerierte Listen, etc. .
    const createNewAnswer = async () => {
        if (isAnswerTextValid() === true) {
            const newAnswer = await firebase.firestore().collection('articles').doc(id).collection('answers').doc();
            await firebase.firestore().collection('articles').doc(id).collection('answers').doc(newAnswer.id).set({
                answerText: answerText,
                voting: 0,
                createdAt: new Date(),
                id: newAnswer.id,
                creator: userData.username,
                creatorId: userData.uid,
            });
            await firebase.firestore().collection('articles').doc(id).update({
                answerCounter: articleData.answerCounter + 1,
            });
            await firebase.firestore().collection('users').doc(userData.uid).collection('answers').doc(answer.id).update({
                answerRefs: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().doc(`/articles/${id}/answers/${newAnswer.id}`)),
            })
            await firebase.firestore().collection('users').doc(userData.uid).update({
                answerCounter: userData.answerCounter + 1
            })
            window.location.reload();
            console.log('Neue Antwort wurde erfolgreich erstellt.');
        }
    }

    const isAnswerTextValid = () => {
        if (answerText === "") {
            setErrorAnswerText('Bitte geben Sie ihre Antwort ein.');
            document.getElementById("answer-error-text").style.visibility = "visible";
            console.log("Es wurde keine Antwort eingegeben.");
            return false;
        }
        document.getElementById("answer-error-text").style.visibility = "hidden";
        return true;
    }

    // Verbindung zu Editor Komponente um auf den eingegebenen Antworttext 
    // Zugriff zu bekommen.
    const callbackEditorText = (answerText) => {
        setAnswerText(answerText);
    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const deleteArticle = async () => {
        await firebase.firestore().collection("articles").doc(id).collection("answers").get().then((querySnapshot) => {
            querySnapshot.forEach((answer) => {
                firebase.firestore().collection("articles").doc(id).collection("answers").doc(answer.id).delete();
            });
        });
        await firebase.firestore().collection('articles').doc(id).delete();
        if (articleData.isPortfolioArticle === true) {
            await firebase.firestore().collection("users").doc(userData.uid).update({
                portfolioArticleCounter: userData.portfolioArticleCounter - 1
            });
            const portfolioArticleDataList = await firebase.firestore().collection('users').doc(userData.uid).collection("portfolioArticles").get();
            portfolioArticleDataList.forEach(async (doc) => {
                const data = await firebase.firestore().collection('users').doc(userData.uid).collection("portfolioArticles").doc(doc.data().id).get();
                data.data().portfolioArticleRefs.forEach(async (doc) => {
                    await firebase.firestore().collection("users").doc(userData.uid).collection("portfolioArticles").doc(data.data().id).update({
                        portfolioArticleRefs: firebase.firestore.FieldValue.arrayRemove(firebase.firestore().doc(`/articles/${doc.id}`))
                    })
                })
            })
        } else {
            await firebase.firestore().collection("users").doc(userData.uid).update({
                articleCounter: userData.articleCounter - 1
            });
            const articleDataList = await firebase.firestore().collection('users').doc(userData.uid).collection("articles").get();
            articleDataList.forEach(async (doc) => {
                const data = await firebase.firestore().collection('users').doc(userData.uid).collection("articles").doc(doc.data().id).get();
                data.data().articleRefs.forEach(async (doc) => {
                    await firebase.firestore().collection("users").doc(userData.uid).collection("articles").doc(data.data().id).update({
                        articleRefs: firebase.firestore.FieldValue.arrayRemove(firebase.firestore().doc(`/articles/${doc.id}`))
                    })
                })
            })
        }
        setOpenDialog(false);
        alert('Beitrag wurde erfolgreich gelöscht.');
        setRedirect(true);
    }

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/articleList" />
    }

    let articleActionButtons;
    if (userData.uid === articleData.creatorId) {
        articleActionButtons = (
            <div>
                <Button>Bearbeiten</Button>
                <Button onClick={handleClickOpen}>Löschen</Button>
                <ChoiceDialog
                    openDialog={openDialog}
                    title="Beitrag löschen?"
                    content="Wollen Sie den Beitrag wirklich unwideruflich löschen?"
                    onYesClick={deleteArticle}
                    onNoClick={handleClose} />
            </div>
        )
    } else {
        articleActionButtons = (
            <div></div>
        )
    }

    return (
        <div className="article-page">
            <div className="article-section">
                <ArticleVoting voting={articleData.voting} />
                <div className="article-content">
                    <h1>{articleData.title}</h1>
                    <p>{articleText}</p>
                    {
                        tagList.map(tag => (
                            <Tagbutton>{tag}</Tagbutton>
                        ))
                    }
                    {articleActionButtons}
                </div>
                <div className="user-info-section">
                    <p>{articleCreatedAt}</p>
                    <Link to={{ pathname: `/userprofile/${articleData.creatorId}` }}>
                        {articleData.creator}
                    </Link>
                </div>
            </div>
            <h2>Antworten:</h2>
            {
                answerList.map((answer, index) => (
                    <Answeritem id={answer.id}
                        articleId={id}
                        answerText={answer.answerText}
                        voting={answer.voting}
                        creator={answer.creator}
                        creatorId={answer.creatorId}
                        currentUserId={userData.uid}
                        createdAt={answerCreatedAt[index]}></Answeritem>
                ))
            }
            <TextEditor title="Antwort:" parentCallbackText={callbackEditorText} />
            <ErrorText id="answer-error-text">{answerErrorText}</ErrorText>
            <div>
                <input
                    value="Antwort erstellen"
                    id="create-answer-button"
                    className="main-button"
                    onClick={() => createNewAnswer()} />
            </div>
        </div>
    );
}

export default ArticlePage;