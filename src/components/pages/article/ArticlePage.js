import React, { useState, useEffect } from 'react';

// own module imports
import TextEditor from '../../gui/inputs/textEditor/TextEditor';
import Tagbutton from '../../gui/buttons/tagbutton/Tagbutton';
import Answeritem from './answeritem/Answeritem';
import Voting from './voting/Voting';

// css imports
import './ArticlePage.css';

// third party imports
import firebase from 'firebase/app';
import { useParams } from "react-router-dom";

function ArticlePage() {
    const { id } = useParams();
    const [tagList, setTagList] = useState([]);
    const [answerList, setAnswerList] = useState([]);
    const [articleData, setArticleData] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await firebase.firestore().collection('articles').doc(id).get();
            setArticleData({...data.data()});
            const answerData = await firebase.firestore().collection('articles').doc(id).collection('answers').get();
            setAnswerList(answerData.docs.map(doc => ({...doc.data()})));
            setTagList(data.data().tags);
            console.log('Daten werden geladen...');
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
            });
            await firebase.firestore().collection('articles').doc(id).update({
                answerCounter: articleData.answerCounter + 1,
            });
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
                <Voting voting={articleData.voting} />
                <h1>{articleData.title}</h1>
                <p>{articleData.articleText}</p>
                {
                tagList.map(tag => (
                    <Tagbutton>{tag}</Tagbutton>
                ))
                }
            </div>
            <p>Antworten:</p>
            {
            answerList.map((answer) => (
                <Answeritem id={answer.id}
                    answerText={answer.answerText}
                    voting={answer.voting}></Answeritem>
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