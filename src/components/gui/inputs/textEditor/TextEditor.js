import React, { useState } from 'react';

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

const TextEditor = ({ title, parentCallbackText }) => {
    const [selectedImages, setSelectedImage] = useState([])

    const imageChangeHandler = (e) => {
        console.log(e.target.files)
        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
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

    const setText = () => {
        parentCallbackText(document.getElementById('text').innerHTML);
    }

    // Setzt die Eigenschaft die übergeben wird
    // Beispiel: bold = fetter Text (<b></b>)
    const editorButtonsHandler = (property) => {
        document.execCommand(property, false);
    }

    return (
        <div className="editor">
            <label>{title}</label>
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
            <div
                className="editor-for-text"
                id="text" contentEditable="true"
                onKeyUp={() => setText()}>
            </div>
        </div>
    )
}

export default TextEditor;