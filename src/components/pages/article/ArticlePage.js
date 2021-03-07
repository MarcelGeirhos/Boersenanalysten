import React, { useState, useEffect } from 'react';

// own module imports
import ArticleVoting from './voting/articleVoting/ArticleVoting';
import TextEditor from '../../gui/inputs/textEditor/TextEditor';
import Tagbutton from '../../gui/buttons/tagbutton/Tagbutton';
import Answeritem from './answeritem/Answeritem';
import firebaseConfig from '../../../firebase/Config';

// css imports
import './ArticlePage.css';

// third party imports
import firebase from 'firebase/app';
import { useParams, Link } from "react-router-dom";

function ArticlePage() {
    const { id } = useParams();
    const [tagList, setTagList] = useState([]);
    const [userData, setUserData] = useState([]);
    const [answerList, setAnswerList] = useState([]);
    const [articleData, setArticleData] = useState("");
    const [articleText, setArticleText] = useState("");
    const [answerCreatedAt, setAnswerCreatedAt] = useState([]);
    const [articleCreatedAt, setArticleCreatedAt] = useState("");
    const dateOptions = { year: '2-digit', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'};

    useEffect(() => {
        const fetchData = async () => {
            // Artikel Daten werden ausgelesen und gesetzt
            const articleData = await firebase.firestore().collection('articles').doc(id).get();
            setArticleCreatedAt(articleData.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions));
            setArticleData({...articleData.data()});
            setTagList(articleData.data().tags);
            
            // Alle Antworten Daten werden ausgelesen und gesetzt
            const answerData = await firebase.firestore().collection('articles').doc(id).collection('answers').get();
            setAnswerCreatedAt(answerData.docs.map(doc => (doc.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions))));
            setAnswerList(answerData.docs.map(doc => ({...doc.data()})));
           
            // TODO Text mit richtiger Formatierung anzeigen lassen.
            const articleTextWithHTML = articleData.data().articleText;
            console.log(articleTextWithHTML);
            let div = document.createElement("div");
            div.innerHTML = articleTextWithHTML;
            let text = div.textContent || div.innerText || "";
            console.log(text);
            setArticleText(text);

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
    // geschrieben z.B. fetter Text oder unnummerierte Listen.
    const createNewAnswer = async (e) => {
        e.preventDefault();
        // TODO hier weitermachen Link zu StackOverflow Beitrag:
        // https://stackoverflow.com/questions/38402025/how-to-create-helper-file-full-of-functions-in-react-native
        //checkText();
        if (true) {
            const article = await firebase.firestore().collection('articles').doc(id);
            const articleRef = await article.get();
            const newAnswerRef = await firebase.firestore().collection('articles').doc(articleRef.id).collection('answers').doc();
            await firebase.firestore().collection('articles').doc(articleRef.id).collection('answers').doc(newAnswerRef.id).set({
                answerText: document.getElementById('text').innerHTML,
                voting: 0,
                createdAt: new Date(),
                id: newAnswerRef.id,
                creator: userData.username,
                creatorId: userData.uid,
            });
            await firebase.firestore().collection('articles').doc(id).update({
                answerCounter: articleData.answerCounter + 1,
            });
            window.location.reload();
            console.log('Neue Antwort wurde erfolgreich erstellt.');
        } else {
            console.log("Leere Eingabefelder");
        }
    }

    /*const checkText = () => {
        if (text === "") {
            setErrorText('Bitte geben Sie einen Text ein.');
            document.getElementById("error-text").style.visibility = "visible";
            return false;
        }
        document.getElementById("error-text").style.visibility = "hidden";
        return true;
    }*/

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
                </div>
                <div className="user-info-section">
                    <p>{articleCreatedAt}</p>
                    <Link to={{pathname: `/userprofile/${articleData.creatorId}`}}>
                        {articleData.creator}
                    </Link>
                </div>
            </div>
            <h2>Antworten:</h2>
            {
            answerList.map((answer, index) => (
                <Answeritem id={answer.id}
                    answerText={answer.answerText}
                    voting={answer.voting}
                    creator={answer.creator}
                    creatorId={answer.creatorId}
                    createdAt={answerCreatedAt[index]}></Answeritem>
            ))
            }
            <form onSubmit={createNewAnswer}>
                <TextEditor title="Antwort:" />
                <div>
                    <input type="submit" value="Antwort erstellen" id="create-answer-button" className="main-button" />
                </div>
            </form>
        </div>
    );
}

export default ArticlePage;