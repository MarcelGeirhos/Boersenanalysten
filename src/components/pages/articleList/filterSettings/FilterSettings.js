import React, { useState } from 'react';

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
    const [searchedUsername, setSearchedUsername] = useState("");
    const [tags, setTags] = useState([]);

    const filterArticleList = async () => {
        
    }

    const callbackSearchedUsername = () => {
        
    }

    // Verbindung zu TagInput Komponente um auf die eingegebenen Tags 
    // Zugriff zu bekommen.
    const callbackTags = (tags) => {
        filterArticleList(tags)
    }

    return (
        <div className="filter">
            <div className="filter-settings">
                <TagInput parentCallbackTags={callbackTags} />
                <div className="filter-settings-username">
                    <TextField
                        label="Benutzername"
                        type="text"
                        onChange={(e) => setSearchedUsername(e.target.value)}
                        variant="standard"
                        className="register-text-field"
                        inputProps={{ 
                            style: { color: 'white'},
                            maxLength: 30,
                        }}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }} />
                </div>
            </div>
            <Mainbutton onClick={() => filterArticleList()}>Filter anwenden</Mainbutton>
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