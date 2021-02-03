import React, { useState } from 'react';

// own module imports
import ErrorText from '../../outputs/errorText/ErrorText';

// css imports
import './TextEditor.css';

// material-ui icon imports
import {
    AddAPhoto,
    FormatListBulleted,
    FormatListNumbered,
    FormatBold,
    FormatItalic,
    FormatUnderlined,
} from '@material-ui/icons';

function TextEditor(props) {
    const [selectedImages, setSelectedImage] = useState([])
    const [errorText, setErrorText] = useState("");
    const [text, setText] = useState("");

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

    return (
        <div>
            <label>{props.title}</label>
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
            {/*onSubmit={(e) => setArticleText(document.getElementById('articleText').innerHTML)*/}
            <div className="editor-for-text" id="text" contentEditable onChange={(e) => setText(e.target.value)}></div>
            <ErrorText id="error-text">{errorText}</ErrorText>
        </div>
    )
}

export default TextEditor;