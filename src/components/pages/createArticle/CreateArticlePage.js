import React, { useState, useEffect } from 'react';

// own module imports
import InputfieldDark from '../../gui/inputs/inputfieldDark/InputfieldDark';
import TextEditor from '../../gui/inputs/textEditor/TextEditor';
import ErrorText from '../../gui/outputs/errorText/ErrorText';
import TagInput from '../../gui/inputs/tagInput/TagInput';
import firebaseConfig from '../../../firebase/Config';

// css imports
import './CreateArticlePage.css';
import '../../gui/inputs/tagInput/TagInput.css';

// third party imports
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';

// material-ui imports
import {
    Checkbox,
    FormControlLabel
} from '@material-ui/core';

function CreateArticlePage() {
    const [title, setTitle] = useState("");
    const [editorText, setEditorText] = useState("");
    const [tags, setTags] = useState([]);
    const [article, setArticle] = useState([]);
    const [userData, setUserData] = useState([]);
    const [portfolioArticle, setPortfolioArticle] = useState([]);
    const [tagErrorText, setTagErrorText] = useState("ErrorText");
    const [titleErrorText, setTitleErrorText] = useState("ErrorText");
    const [editorErrorText, setEditorErrorText] = useState("ErrorText");
    const [routeRedirect, setRedirect] = useState(false);
    const [isPortfolioArticle, setIsPortfolioArticle] = useState(false);

    useEffect(() => {
        firebaseConfig.getUserState().then(user => {
            const fetchData = async () => {
                await firebase.firestore().collection('users').doc(user.uid).get().then(
                    snapshot => {
                        setUserData(snapshot.data())
                    }).catch(error => {
                        console.log('Error getting userData ', error);
                    })
                const portfolioArticleList = await firebase.firestore().collection('users').doc(user.uid).collection('portfolioArticles').get();
                portfolioArticleList.forEach(async (doc) => {
                    const portfolioArticles = await firebase.firestore().collection('users').doc(user.uid).collection('portfolioArticles').doc(doc.data().id).get();
                    setPortfolioArticle(portfolioArticles.data());
                })

                const articleList = await firebase.firestore().collection('users').doc(user.uid).collection('articles').get();
                articleList.forEach(async (doc) => {
                    const articles = await firebase.firestore().collection('users').doc(user.uid).collection('articles').doc(doc.data().id).get();
                    setArticle(articles.data());
                })
            }
            fetchData();
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Der Artikel Text wird mit allen Eigenschaften die vom
    // Benutzer mit dem Editor gesetzt wurden in die Datenbank
    // geschrieben z.B. fetter Text oder unnummerierte Listen.
    async function createNewArticle() {
        let isTitleValid = checkTitel();
        let isEditorTextValid = checkEditorText();
        let isTagValid = checkTags();
        if (isTitleValid && isEditorTextValid && isTagValid) {
            const newArticle = await firebase.firestore().collection('articles').doc();
            const newArticleRef = await newArticle.get();
            await firebase.firestore().collection('articles').doc(newArticleRef.id).set({
                title: title,
                articleText: document.getElementById('text').innerHTML,
                tags: tags,
                views: 0,
                voting: 0,
                answerCounter: 0,
                createdAt: new Date(),
                id: newArticleRef.id,
                creator: userData.username,
                creatorId: userData.uid,
                isPortfolioArticle: isPortfolioArticle,
            })
            if (isPortfolioArticle === true) {
                await firebase.firestore().collection('users').doc(userData.uid).collection('portfolioArticles').doc(portfolioArticle.id).update({
                    portfolioArticleRefs: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().doc(`/articles/${newArticleRef.id}`)),
                })
                await firebase.firestore().collection('users').doc(userData.uid).update({
                    portfolioArticleCounter: userData.portfolioArticleCounter + 1
                })
            } else {
                await firebase.firestore().collection('users').doc(userData.uid).collection('articles').doc(article.id).update({
                    articleRefs: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().doc(`/articles/${newArticleRef.id}`)),
                })
                await firebase.firestore().collection('users').doc(userData.uid).update({
                    articleCounter: userData.articleCounter + 1
                })
            }
            setRedirect(true);
            console.log('Neuer Artikel wurde erfolgreich erstellt.');
        } else {
            console.log("Leere Eingabefelder");
        }
    }

    const checkTitel = () => {
        if (title === "") {
            setTitleErrorText('Bitte geben Sie einen Titel ein.');
            document.getElementById("title-error-text").style.visibility = "visible";
            return false;
        }
        document.getElementById("title-error-text").style.visibility = "hidden";
        return true;
    }

    const checkEditorText = () => {
        if (editorText === "") {
            setEditorErrorText('Bitte geben Sie einen Text ein.');
            document.getElementById("editor-error-text").style.visibility = "visible";
            return false;
        }
        document.getElementById("editor-error-text").style.visibility = "hidden";
        return true;
    }

    const checkTags = () => {
        if (tags.length === 0) {
            setTagErrorText('Bitte geben Sie mindestens einen Tag an, damit ihr Beitrag besser gefunden werden kann.');
            document.getElementById("tag-error-text").style.visibility = "visible";
            return false;
        }
        document.getElementById("tag-error-text").style.visibility = "hidden";
        return true;
    }

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/articlelist" />
    }

    // Verbindung zu TagInput Komponente um auf die eingegebenen Tags 
    // Zugriff zu bekommen.
    const callbackTags = (tags) => {
        setTags(tags);
    }

    // Verbindung zu TagInput Komponente um auf die eingegebenen Tags 
    // Zugriff zu bekommen.
    const callbackEditorText = (editorText) => {
        setEditorText(editorText);
    }

    const handleIsPortfolioArticle = () => {
        setIsPortfolioArticle(!isPortfolioArticle);
    }

    return (
        <div className="create-article">
            <h1>Beitrag erstellen</h1>
            <div className="create-article-title">
                <label>Titel:</label>
                <InputfieldDark type="text" placeholder="Beitragstitel..." onChange={(e) => setTitle(e.target.value)} ></InputfieldDark>
                <ErrorText id="title-error-text">{titleErrorText}</ErrorText>
            </div>
            <TextEditor title="Beitrag:" parentCallbackText={callbackEditorText}/>
            <ErrorText id="editor-error-text">{editorErrorText}</ErrorText>
            <FormControlLabel 
                control={<Checkbox
                    checked={isPortfolioArticle}
                    onChange={handleIsPortfolioArticle}
                    color="primary"/>}
                label="Portfolio Beitrag" />
            <TagInput parentCallbackTags={callbackTags} />
            <ErrorText id="tag-error-text">{tagErrorText}</ErrorText>
            <div>
                <input
                    value="Beitrag erstellen"
                    id="create-article-button"
                    className="main-button"
                    onClick={() => createNewArticle()}/>
            </div>
        </div>
    );
}

export default CreateArticlePage;