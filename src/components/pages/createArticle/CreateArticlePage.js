import React, { useState } from 'react';

// own module imports
import InputfieldDark from '../../gui/inputs/InputfieldDark';
import Mainbutton from '../../gui/buttons/Mainbutton';

// css imports
import './CreateArticlePage.css';

// material-ui icons
import {
    AddAPhoto,
    FormatListBulleted,
    FormatListNumbered,
    FormatBold,
    FormatItalic,
    FormatUnderlined,
} from '@material-ui/icons';

function CreateArticlePage() {
    const [selectedImages, setSelectedImage] = useState([])

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

    function editorButtonsHandler(property) {
        document.execCommand(property, false);
    }

    return (
        <div className="create-article">
            <h1>Beitrag erstellen</h1>
            <div>
                <label>Titel:</label>
                <InputfieldDark type="text" placeholder="Beitragstitel..."></InputfieldDark>
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
                <div className="editor-canvas" id="canvas" contentEditable></div>
            </div>
            <div>
                <label>Tags:</label>
                <InputfieldDark type="text" placeholder="Tags..."></InputfieldDark>
            </div>
            <div>
                <Mainbutton>Beitrag erstellen</Mainbutton>
            </div>
        </div>
    );
}

export default CreateArticlePage;