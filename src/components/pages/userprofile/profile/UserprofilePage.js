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
    const [memberSince, setMemberSince] = useState("");
    const options = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };

    useEffect(() => {
        firebaseConfig.getUserState().then(user => {
            const fetchData = async () => {
                await firebase.firestore().collection('users').doc(user.uid).get().then(
                    snapshot => {
                        setUserData(snapshot.data());
                        setMemberSince(snapshot.data().createdAt.toDate().toLocaleDateString("de-DE", options));
                    }).catch(error => {
                        console.log('Error getting userData ', error);
                    })
            }
            fetchData();
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation />
            <div className="user-profile-grid overview">
                <p>Benutzername: {userData.username}</p>
                <p>Portfolio: {userData.portfolioLink}</p>
                <p>Beschreibung: {userData.userDescription}</p>
            </div>
            <div className="user-profile-grid stats">
                <p>Aktien: <br/>{userData.shareCounter}</p>
                <p>Antworten: <br/>{userData.answerCounter}</p>
                <p>Beiträge: <br/>{userData.articleCounter}</p>
                <p>Portfoliobeiträge: <br/>{userData.portfolioArticleCounter}</p>
                <p>Standort: {userData.location}</p>
                <p>Mitglied seit: {memberSince}</p>
            </div>
            <TopTagSection />
            <div className="user-profile-grid article-list">
                <h1>Beitragsliste</h1>
                {/* TODO Liste + Auswahl implementieren. */}
            </div>
        </div>
    );
}

export default UserprofilePage;