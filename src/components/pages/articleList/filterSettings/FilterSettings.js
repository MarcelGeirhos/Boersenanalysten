import React from 'react';

// own module imports
import Mainbutton from '../../../gui/buttons/Mainbutton';
import InputfieldDark from '../../../gui/inputs/InputfieldDark';

// css imports
import './FilterSettings.css';

function FilterSettings() {
    return (
        <div className="filter-settings">
            <div>
                <label>Tags:</label>
                <InputfieldDark type="text" placeholder="Tags..." />
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
                <Mainbutton>Filter anwenden</Mainbutton>
            </div>
        </div>
    )
}

export default FilterSettings;