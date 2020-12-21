import React, { useState } from 'react';

// own module imports
import Inputfield from '../../gui/inputs/Inputfield';
import Mainbutton from '../../gui/buttons/Mainbutton';

// css imports
import './CreateArticlePage.css';

// material-ui icons
import { AddAPhoto } from '@material-ui/icons';

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
            return <img src={photo} key={photo} />
        })
    }

    function editorButtonsHandler(property) {
        document.execCommand(property, false);
        //console.log('Test 1');
        //const editorButtons = document.getElementsByClassName('editor-button');
        //const editorCanvas = document.getElementById('canvas');
        //console.log(editorCanvas);
        //const setAttribute = (element) => {
        //    
        //}
        //for (let i = 0; i < editorButtons.length; i++) {
        //setAttribute(element.dataset.attribute);
        //editorButtons[i].addEventListener('click', function() {
        //    console.log('Test 2'); 
        //});
        //}
    }

    return (
        <div className="create-article-form">
            <h1>Beitrag erstellen</h1>
            <div>
                <label>Titel:</label>
                <Inputfield type="text" placeholder="Beitragstitel..."></Inputfield>
            </div>
            <div>
                <label>Beitrag:</label>
                <AddAPhoto />
                <input type="file" multiple id="file" onChange={imageChangeHandler} ></input>
                {renderPhotos(selectedImages)}
                <div className="editor-menuebar">
                    <button className="editor-button" onClick={() => editorButtonsHandler('bold')}>Bold</button>
                    <button className="editor-button" onClick={() => editorButtonsHandler('italic')}>Italic</button>
                    <button className="editor-button" onClick={() => editorButtonsHandler('underline')}>Underline</button>
                </div>
                <div className="editor-canvas" id="canvas" contentEditable></div>
                {/* WYSIWYG Editor Video Tutorials anschauen */}
            </div>
            <div>
                <label>Tags:</label>
                <Inputfield type="text" placeholder="Tags..."></Inputfield>
            </div>
            <div>
                <Mainbutton>Beitrag erstellen</Mainbutton>
            </div>
        </div>
    );
}

export default CreateArticlePage;