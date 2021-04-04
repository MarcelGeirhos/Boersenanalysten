import React from 'react';

// own module imports
import TagInput from '../../../gui/inputs/tagInput/TagInput';
import Mainbutton from '../../../gui/buttons/mainbutton/Mainbutton';

// css imports
import './FilterSettings.css';

// third party imports
import firebase from 'firebase/app';

const FilterSettings = ({ filteredArticleList }) => {

    const filterArticleList = async () => {
        let searchCriteria = "";
        if (document.getElementById('newest').checked) {
            searchCriteria = "createdAt";
        } else if (document.getElementById('bestVoting').checked) {
            searchCriteria = "voting";
        } else if (document.getElementById('mostAnswers').checked) {
            searchCriteria = "answerCounter";
        }
        const filteredList = await firebase.firestore().collection('articles')
                            .orderBy(searchCriteria, "desc")
                            .limit(5).get();
        filteredArticleList(filteredList);
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