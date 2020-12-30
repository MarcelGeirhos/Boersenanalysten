import React from 'react';

// own module imports
import UserprofileNavigation from '../UserprofileNavigation';

// css imports
import './UserprofilePage.css';

function UserprofilePage() {
    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <div className="user-profile-grid overview">
                <p>Benutzername: [Benutzername]</p>
                <p>Portfolio: [Portfolio Beitragslink]</p>
                <p>Beschreibung: [Beschreibung des Benutzers]</p>
            </div>
            <div className="user-profile-grid stats">
                <p>[Aktienanteile] Aktien</p>
                <p>[Anzahl Antworten] Antworten</p>
                <p>[Anzahl Beiträge] Beiträge</p>
                <p>[Anzahl Portfoliobeiträge] Portfoliobeiträge</p>
                <p>[Standort]</p>
                <p>Mitglied seit: [Datum im Format Tag.Monat.Jahr z.B. 13.12.2020]</p>
            </div>
            <div className="user-profile-grid top-tags">
                {/* TODO Grid Layout implementieren für Top Tags Ansicht. */}
            </div>
            <div className="user-profile-grid article-list">
                {/* TODO Liste + Auswahl implementieren. */}
            </div>
        </div>
    );
}

export default UserprofilePage;