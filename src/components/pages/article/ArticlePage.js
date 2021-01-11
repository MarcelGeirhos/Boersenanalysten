import React, { useState, useEffect } from 'react';

// own module imports
import TextEditor from '../../gui/inputs/textEditor/TextEditor';

// css imports
import './ArticlePage.css';

// third party imports
import firebase from 'firebase/app';
import { useParams } from "react-router-dom";

function ArticlePage() {
    const { id } = useParams();
    const [articleData, setArticleData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await firebase.firestore().collection('articles').doc(id).get();
            setArticleData({...data.data()});
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Der Kommentar Text wird mit allen Eigenschaften die vom
    // Benutzer mit dem Editor gesetzt wurden in die Datenbank
    // geschrieben z.B. fetter Text oder unnummerierte Listen.
    const createNewComment = async (e) => {
        e.preventDefault();
        if (document.getElementById('text').innerHTML !== "") {
            const article = await firebase.firestore().collection('articles').doc(id);
            const articleRef = await article.get();
            const newCommentRef = await firebase.firestore().collection('articles').doc(articleRef.id).collection('comments').doc();
            await firebase.firestore().collection('articles').doc(articleRef.id).collection('comments').doc(newCommentRef.id).set({
                commentText: document.getElementById('text').innerHTML,
                voting: 0,
                createdAt: new Date(),
                id: newCommentRef.id,
            })
            console.log('Neuer Kommentar wurde erstellt.');
        } else {
            console.log("Leere Eingabefelder");
        }
    }

    return (
        <div className="article-page">
            <h1>{articleData.title}</h1>
            <p>{articleData.articleText}</p>
            <p>{articleData.tags}</p>
            <p>Kommentar:</p>
            <form onSubmit={createNewComment}>
                <TextEditor />
                <div>
                    <input type="submit" value="Kommentar erstellen" id="create-comment-button" className="main-button" />
                </div>
            </form>
        </div>
    );
}

export default ArticlePage;