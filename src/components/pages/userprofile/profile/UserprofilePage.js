import React, { useState, useEffect } from 'react';

// own module imports
import UserprofileNavigation from '../UserprofileNavigation';
import TopTagSection from './topTagSection/TopTagSection';
import firebaseConfig from '../../../../firebase/Config';

// css imports
import './UserprofilePage.css';

// third party imports
import firebase from 'firebase/app';

function UserprofilePage() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        firebaseConfig.getUserState().then(user => {
            const fetchData = async () => {
                await firebase.firestore().collection('users').doc(user.uid).get().then(
                    snapshot => {
                        console.log(snapshot.data());
                        setUserData(snapshot.data());
                    }).catch(error => {
                        console.log('Error getting userData ', error);
                    })
            }
            fetchData();
        })
    }, [])

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <div className="user-profile-grid overview">
                <p>Benutzername: {userData.username}</p>
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
            <TopTagSection />
            <div className="user-profile-grid article-list">
                {/* TODO Liste + Auswahl implementieren. */}
            </div>
        </div>
    );
}

export default UserprofilePage;