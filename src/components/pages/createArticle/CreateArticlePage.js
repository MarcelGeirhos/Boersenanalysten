import React, { useState } from 'react';

// own module imports
import InputfieldDark from '../../gui/inputs/InputfieldDark';
import TextEditor from '../../gui/inputs/textEditor/TextEditor';
import { createArticle } from '../../../redux/actions/ArticleActions';

// css imports
import './CreateArticlePage.css';

// third party imports
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function CreateArticlePage() {
    const [title, setTitle] = useState("");
    
    const [tags, setTags] = useState("");

    const [routeRedirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const createArticleAction = (title, articleText, tags) => dispatch(createArticle(title, articleText, tags));

    // Der Artikel Text wird mit allen Eigenschaften die vom
    // Benutzer mit dem Editor gesetzt wurden in die Datenbank
    // geschrieben z.B. fetter Text oder unnummerierte Listen.
    const createNewArticle = async (e) => {
        e.preventDefault();
        if (title !== "" && document.getElementById('text').innerHTML !== "" && tags !== "") {
            await createArticleAction(title, document.getElementById('text').innerHTML, tags);
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
                <div>
                    <label>Titel:</label>
                    <InputfieldDark type="text" placeholder="Beitragstitel..." onChange={(e) => setTitle(e.target.value)} ></InputfieldDark>
                </div>
                <TextEditor />
                <div>
                    <label>Tags:</label>
                    <InputfieldDark type="text" placeholder="Tags..." onChange={(e) => setTags(e.target.value)}></InputfieldDark>
                </div>
                <div>
                    <input type="submit" value="Beitrag erstellen" id="create-article-button" className="main-button" />
                </div>
            </form>
        </div>
    );
}

export default CreateArticlePage;