import React from 'react';

// own module imports
import TagInput from '../../../gui/inputs/tagInput/TagInput';
import Mainbutton from '../../../gui/buttons/mainbutton/Mainbutton';

// css imports
import './FilterSettings.css';

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
                <label>Zeitraum:</label>
                <input type="date" id="filter-start-date" min="01.01.2021" max="04.01.2021" />
                <p>bis</p>
                <input type="date" id="filter-end-date" min="01.01.2021" max="04.01.2021" />
                <Mainbutton onClick={filterArticleList}>Filter anwenden</Mainbutton>
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