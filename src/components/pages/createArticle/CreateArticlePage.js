import React from 'react';

// own module imports
import Inputfield from '../../gui/inputs/Inputfield';
import Mainbutton from '../../gui/buttons/Mainbutton';

// css imports
import './CreateArticlePage.css';

function CreateArticlePage() {
    return (
        <div>
            <form className="create-article-form">
                <h1>Beitrag erstellen</h1>
                <div>
                    <label>Titel:</label>
                    <Inputfield type="text" placeholder="Beitragstitel..."></Inputfield>
                </div>
                <div>
                    <label>Beitrag:</label>
                    {/* WYSIWYG Editor Video Tutorials anschauen */}
                </div>
                <div>
                    <label>Tags:</label>
                    <Inputfield type="text" placeholder="Tags..."></Inputfield>
                </div>
                <div>
                    <Mainbutton>Beitrag erstellen</Mainbutton>
                </div>
            </form>
        </div>
    );
}

export default CreateArticlePage;