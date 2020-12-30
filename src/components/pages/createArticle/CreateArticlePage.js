import React, { useState } from 'react';

// own module imports
import InputfieldDark from '../../gui/inputs/InputfieldDark';
import { createArticle } from '../../../redux/actions/ArticleActions';

// css imports
import './CreateArticlePage.css';

// material-ui icon imports
import {
    AddAPhoto,
    FormatListBulleted,
    FormatListNumbered,
    FormatBold,
    FormatItalic,
    FormatUnderlined,
} from '@material-ui/icons';

// third party imports
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function CreateArticlePage() {
    const [title, setTitle] = useState("");
    
    const [tags, setTags] = useState("");
    const [selectedImages, setSelectedImage] = useState([])

    const [routeRedirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const createArticleAction = (title, articleText, tags) => dispatch(createArticle(title, articleText, tags));

    const imageChangeHandler = (e) => {
        console.log(e.target.files)
        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            console.log(fileArray)
            setSelectedImage((prevImages) => prevImages.concat(fileArray))
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file)
            )
        }
    }

    const renderPhotos = (source) => {
        return source.map((photo) => {
            return <img src={photo} alt="Bild" key={photo} />
        })
    }

    // Setzt die Eigenschaft die übergeben wird
    // Beispiel: bold = fetter Text (<b></b>)
    function editorButtonsHandler(property) {
        document.execCommand(property, false);
    }

    // Der Artikel Text wird mit allen Eigenschaften die vom
    // Benutzer mit dem Editor gesetzt wurden in die Datenbank
    // geschrieben z.B. fetter Text oder unnummerierte Listen.
    const createNewArticle = async (e) => {
        e.preventDefault();
        if (title !== "" && document.getElementById('articleText').innerHTML !== "" && tags !== "") {
            await createArticleAction(title, document.getElementById('articleText').innerHTML, tags);
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
                <div>
                    <div className="editor-menuebar">
                        <button className="editor-button" onClick={() => editorButtonsHandler('bold')}><FormatBold /></button>
                        <button className="editor-button" onClick={() => editorButtonsHandler('italic')}><FormatItalic /></button>
                        <button className="editor-button" onClick={() => editorButtonsHandler('underline')}><FormatUnderlined /></button>
                        <button className="editor-button" onClick={() => editorButtonsHandler('insertunorderedlist')}><FormatListBulleted /></button>
                        <button className="editor-button" onClick={() => editorButtonsHandler('insertorderedlist')}><FormatListNumbered /></button>
                        <button className="editor-button" ><AddAPhoto /></button>
                        <input type="file" multiple id="file" onChange={imageChangeHandler}></input>
                        {renderPhotos(selectedImages)}
                    </div>
                    <label>Beitrag:</label>
                    {/*onSubmit={(e) => setArticleText(document.getElementById('articleText').innerHTML)*/}
                    <div className="editor-for-article-text" id="articleText" contentEditable></div>
                </div>
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