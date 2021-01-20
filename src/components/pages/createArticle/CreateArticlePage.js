import React, { useState } from 'react';

// own module imports
import TagInput from '../../gui/inputs/tagInput/TagInput';
import InputfieldDark from '../../gui/inputs/inputfieldDark/InputfieldDark';
import TextEditor from '../../gui/inputs/textEditor/TextEditor';
import { createArticle } from '../../../redux/actions/ArticleActions';

// css imports
import './CreateArticlePage.css';

// third party imports
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/app';

function CreateArticlePage() {
    const selectedTags = tags => console.log(tags);
    const [title, setTitle] = useState("");

    const [routeRedirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const createArticleAction = (title, articleText, selectedTags) => dispatch(createArticle(title, articleText, selectedTags));

    // Der Artikel Text wird mit allen Eigenschaften die vom
    // Benutzer mit dem Editor gesetzt wurden in die Datenbank
    // geschrieben z.B. fetter Text oder unnummerierte Listen.
    const createNewArticle = async (e) => {
        e.preventDefault();
        if (title !== "" && document.getElementById('text').innerHTML !== "" && selectedTags !== "") {
            console.log(selectedTags);
            const newArticle = await firebase.firestore().collection('articles').doc();
            const newArticleRef = await newArticle.get();
            await firebase.firestore().collection('articles').doc(newArticleRef.id).set({
            title: title,
            articleText: document.getElementById('text').innerHTML,
            tags: ['Test'],
            views: 0,
            voting: 0,
            answerCounter: 0,
            createdAt: new Date(),
            id: newArticleRef.id,
        })
            //await createArticleAction(title, document.getElementById('text').innerHTML, selectedTags.document);
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

    return (
        <div className="create-article">
            <form onSubmit={createNewArticle}>
                <h1>Beitrag erstellen</h1>
                <div className="create-article-title">
                    <label>Titel:</label>
                    <InputfieldDark type="text" placeholder="Beitragstitel..." onChange={(e) => setTitle(e.target.value)} ></InputfieldDark>
                </div>
                <TextEditor title="Beitrag:" />
                <label>Tags:</label>
                <TagInput selectedTags={selectedTags}/>
                <div>
                    <input type="submit" value="Beitrag erstellen" id="create-article-button" className="main-button" />
                </div>
            </form>
        </div>
    );
}

export default CreateArticlePage;