import React, { useState, useEffect } from 'react';

// own module imports
import InputfieldDark from '../../gui/inputs/inputfieldDark/InputfieldDark';
import TextEditor from '../../gui/inputs/textEditor/TextEditor';
import ErrorText from '../../gui/outputs/errorText/ErrorText';
import firebaseConfig from '../../../firebase/Config';

// css imports
import './CreateArticlePage.css';
import '../../gui/inputs/tagInput/TagInput.css';

// third party imports
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';

// material-ui icon imports
import {
    Cancel,
    PostAdd,
} from '@material-ui/icons';

function CreateArticlePage() {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [titleErrorText, setTitleErrorText] = useState("ErrorText");
    const [tagErrorText, setTagErrorText] = useState("ErrorText");
    const [userData, setUserData] = useState([]);
    const [routeRedirect, setRedirect] = useState(false);

    useEffect(() => {
        firebaseConfig.getUserState().then(user => {
            const fetchData = async () => {
                await firebase.firestore().collection('users').doc(user.uid).get().then(
                    snapshot => {
                        setUserData(snapshot.data())
                    }).catch(error => {
                        console.log('Error getting userData ', error);
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
        let isTagValid = checkTags();
        if (isTitleValid && document.getElementById('text').innerHTML !== "" && isTagValid) {
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
            })
            setRedirect(true);
            console.log('Neuer Artikel wurde erstellt.');
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
        return <Redirect to="/articleList" />
    }

    const addTag = () => {
        let tag = document.getElementById('tag-inputfield').value;
        if (tag !== "") {
            setTags([...tags, tag]);
            document.getElementById('tag-inputfield').value = "";
        }
    }

    const removeTag = indexToRemove => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    }

    return (
        <div className="create-article">
            <h1>Beitrag erstellen</h1>
            <div className="create-article-title">
                <label>Titel:</label>
                <InputfieldDark type="text" placeholder="Beitragstitel..." onChange={(e) => setTitle(e.target.value)} ></InputfieldDark>
                <ErrorText id="title-error-text">{titleErrorText}</ErrorText>
            </div>
            <TextEditor title="Beitrag:" />
            <label>Tags:</label>
            <div className="tags-input">
                <input type="text" id="tag-inputfield" placeholder="z.B. Dividendenaktien, Amazon, USA, ..." onKeyUp={e => (e.key === "Enter" ? addTag() : null)} />
                <button onClick={() => addTag()}><PostAdd /></button>
                <ErrorText id="tag-error-text">{tagErrorText}</ErrorText>
            </div>
            <ul id="tags">
            {
                tags.map((tag, index) => (
                    <li key={index} className="tag-listitem">
                    <span className="tag-title">{tag}</span>
                    <span className="tag-close-icon" onClick={() => removeTag(index)}><Cancel /></span>
                </li>)
                )
            }
            </ul>
            <div>
                <input value="Beitrag erstellen" id="create-article-button" className="main-button" onClick={() => createNewArticle()}/>
            </div>
        </div>
    );
}

export default CreateArticlePage;