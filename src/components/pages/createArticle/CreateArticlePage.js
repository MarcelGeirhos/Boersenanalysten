import React, { useState } from 'react';

// own module imports
import InputfieldDark from '../../gui/inputs/inputfieldDark/InputfieldDark';
import TextEditor from '../../gui/inputs/textEditor/TextEditor';

// css imports
import './CreateArticlePage.css';
import '../../gui/inputs/tagInput/TagInput.css';

// third party imports
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';

// material-ui icon imports
import { Cancel } from '@material-ui/icons';

function CreateArticlePage() {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);

    const [routeRedirect, setRedirect] = useState(false);

    // Der Artikel Text wird mit allen Eigenschaften die vom
    // Benutzer mit dem Editor gesetzt wurden in die Datenbank
    // geschrieben z.B. fetter Text oder unnummerierte Listen.
    async function createNewArticle() {
        if (title !== "" && document.getElementById('text').innerHTML !== "" && tags !== "") {
            console.log(tags);
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
        })
            setRedirect(true);
            console.log('Neuer Artikel wurde erstellt.');
        } else {
            console.log("Leere Eingabefelder");
        }
    }

    const redirectTo = routeRedirect;
    if (redirectTo) {
        return <Redirect to="/articleList" />
    }

    const addTags = event => {
        console.log('Add Tag');
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            event.target.value = "";
        }
    }

    const removeTags = indexToRemove => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    }

    return (
        <div className="create-article">
            <h1>Beitrag erstellen</h1>
            <div className="create-article-title">
                <label>Titel:</label>
                <InputfieldDark type="text" placeholder="Beitragstitel..." onChange={(e) => setTitle(e.target.value)} ></InputfieldDark>
            </div>
            <TextEditor title="Beitrag:" />
            <label>Tags:</label>
            <div className="tags-input">
                <input type="text" placeholder="Enter drücken zum hinzufügen..." onKeyUp={e => (e.key === "Enter" ? addTags(e) : null)} />
                <ul id="tags">
                {
                    tags.map((tag, index) => (
                        <li key={index} className="tag-listitem">
                        <span className="tag-title">{tag}</span>
                        <span className="tag-close-icon" onClick={() => removeTags(index)}><Cancel /></span>
                    </li>)
                    )
                }
                </ul>
            </div>
            <div>
                <input value="Beitrag erstellen" id="create-article-button" className="main-button" onClick={() => createNewArticle()}/>
            </div>
        </div>
    );
}

export default CreateArticlePage;