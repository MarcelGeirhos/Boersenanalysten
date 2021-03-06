import React, { useState, useEffect } from 'react';

// own module imports
import firebaseConfig from '../../../../firebase/Config';
import TopTagSection from './topTagSection/TopTagSection';
import UserprofileNavigation from '../UserprofileNavigation';

// css imports
import './UserprofilePage.css';

// third party imports
import firebase from 'firebase/app';
import { useParams } from "react-router-dom";

function UserprofilePage() {
    const { id } = useParams();
    const [userData, setUserData] = useState([]);
    const [memberSince, setMemberSince] = useState("");
    const dateOptions = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };
    
    useEffect(() => {
        firebaseConfig.getUserState().then(user => {
            const fetchData = async () => {
                await firebase.firestore().collection('users').doc(id).get().then(
                    snapshot => {
                        setUserData(snapshot.data());
                        setMemberSince(snapshot.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions));
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
            <UserprofileNavigation selectedTab={0} />
            <div className="user-profile-grid overview">
                <p>Benutzername: {userData.username}</p>
                <p>Portfolio: {userData.portfolioLink}</p>
                <p>Über mich: {userData.userDescription}</p>
            </div>
            <div className="user-profile-grid stats">
                <div className="counter-stats">
                    <p>{userData.shareCounter}<br/>Aktien</p>
                    <p>{userData.answerCounter}<br/>Antworten</p>
                    <p>{userData.articleCounter}<br/>Beiträge</p>
                    <p>{userData.portfolioArticleCounter}<br/>Portfoliobeiträge</p>
                </div>
                <p>Wohnort: {userData.domicile}</p>
                <p>Mitglied seit: {memberSince}</p>
            </div>
            <TopTagSection />
        </div>
    );
}

export default UserprofilePage;