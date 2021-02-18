import React from 'react';

// own module imports
import TagInput from '../../../gui/inputs/tagInput/TagInput';
import Mainbutton from '../../../gui/buttons/mainbutton/Mainbutton';

// css imports
import './FilterSettings.css';

// third party imports
import firebase from 'firebase/app';

function FilterSettings() {
    const filterArticleList = async () => {
        const articles = await firebase.firestore().collection('articles');
        const filteredArticles = articles.where("id", "==", "7UwDoQASC1z4q0IE5gPp").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
            })
        });
    }

    return (
        <div className="filter-settings">
            <div>
                <label>Tags:</label>
                <TagInput />
                <label>Zeitraum:</label>
                <input type="date" id="filter-start-date" min="01.01.2021" max="04.01.2021" />
                <p>bis</p>
                <input type="date" id="filter-end-date" min="01.01.2021" max="04.01.2021" />
                <label>Sortiert nach:</label>
                <fieldset>
                    <input type="radio" id="newest" value="newest" name="filter-sorted" />
                    <label for="new">Neuste</label>
                    <input type="radio" id="bestVoting" value="bestVoting" name="filter-sorted" />
                    <label for="voting">Bestes Voting</label>
                    <input type="radio" id="mostAnswers" value="mostAnswers" name="filter-sorted" />
                    <label for="answers">Meiste Antworten</label>
                    <input type="radio" id="mostViews" value="mostViews" name="filter-sorted" />
                    <label for="views">Meiste Ansichten</label>
                </fieldset>
                <Mainbutton onClick={filterArticleList}>Filter anwenden</Mainbutton>
            </div>
        </div>
    )
}

export default FilterSettings;