import React from 'react';

// own module imports
import TagInput from '../../../gui/inputs/tagInput/TagInput';
import Mainbutton from '../../../gui/buttons/mainbutton/Mainbutton';

// css imports
import './FilterSettings.css';

// material-ui imports
import { TextField } from '@material-ui/core';

// third party imports
//import firebase from 'firebase/app';

const FilterSettings = (/*{ filteredArticleList }*/) => {

    const filterArticleList = async () => {
        
    }

    // Verbindung zu TagInput Komponente um auf die eingegebenen Tags 
    // Zugriff zu bekommen.
    const callbackTags = (tags) => {
        filterArticleList(tags)
    }

    return (
        <div className="filter-settings">
            <div>
                <TagInput parentCallbackTags={callbackTags} />
                <TextField
                    label="Benutzername"
                    type="text"
                    //onChange={(e) => setUsername(e.target.value)}
                    variant="standard"
                    className="register-text-field"
                    //error={usernameError}
                    //helperText={usernameErrorText}
                    autoFocus
                    inputProps={{ 
                        style: { color: 'white'},
                        maxLength: 30,
                    }}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }} />
                    <br />
                <Mainbutton link="/articleList" onClick={filterArticleList}>Filter anwenden</Mainbutton>
            </div>
        </div>
    )
}

export default FilterSettings;

/*const articles = await firebase.firestore().collection('articles');
        tags.map((tag) => {
            console.log(tag);
            const filteredArticles = articles.where("tags", "==", tag).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
            })
            // TODO hier weitermachen und die gefilterte Liste zu ArticleListPage weitergeben,
            // davor Daten richtig auslesen.
            console.log(filteredArticles);
        });
        })*/