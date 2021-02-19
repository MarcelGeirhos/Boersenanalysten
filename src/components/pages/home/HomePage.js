import React from 'react';

// own module imports
import TagButton from '../../../components/gui/buttons/tagbutton/Tagbutton';

// css imports
import './HomePage.css';

function HomePage() {
    return (
        <div style={{
            backgroundImage: "url(/images/background.jpg)",
            backgroundSize: 'cover',
            position: 'absolute',
            height: '100%',
            width: '100%',
        }}>
            <div className="home-page-content">
                <h1>Boersenanalysten</h1>
                <h2>Von Investoren für Investoren</h2>
                <div className="home-page-tags">
                    <TagButton>Dividendenaktien</TagButton>
                    <TagButton>Growth Aktien</TagButton>
                    <TagButton>Tesla</TagButton>
                    <TagButton>Alphabet</TagButton>
                    <TagButton>Tencent</TagButton>

                    <TagButton>Investieren</TagButton>
                    <TagButton>Immobilien</TagButton>
                    <TagButton>Depots</TagButton>
                    <TagButton>Lebensversicherungen</TagButton>
                    <TagButton>Tenbagger</TagButton>

                    <TagButton>Portfolio</TagButton>
                    <TagButton>Staatsanleihen</TagButton>
                    <TagButton>Unternehmensanleihen</TagButton>
                    <TagButton>Bitcoin</TagButton>
                    <TagButton>Gold</TagButton>
                </div>
            </div>
        </div>
    );
}

export default HomePage;