import React, { useState, useEffect } from 'react';

// own module imports
import firebaseConfig from '../../../../../firebase/Config';

// css imports
import './SettingsMenu.css';

// third party imports
import firebase from 'firebase/app';
import { Link, useParams } from "react-router-dom";

const SettingsMenu = ({ parentCallbackUserData }) => {
    const { id } = useParams();

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        firebaseConfig.getUserState().then(user => {
            const fetchData = async () => {
                await firebase.firestore().collection('users').doc(id).get().then(
                    snapshot => {
                        setUserData(snapshot.data());
                        parentCallbackUserData(snapshot.data());
                    }).catch(error => {
                        console.log('Error getting userData ', error);
                    })
            }
            fetchData();
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="settings-menu">
            <ul>
                <Link to={{pathname: `/settings/profileSettings/${userData.uid}`}}>
                    <li>Profil</li>
                </Link>
                <Link to={{pathname: `/settings/emailSettings/${userData.uid}`}}>
                    <li>E-Mail</li>
                </Link>
                <Link to={{pathname: `/settings/passwordSettings/${userData.uid}`}}>
                    <li>Passwort</li>
                </Link>
                <Link to={{pathname: `/settings/portfolioHistorySettings/${userData.uid}`}}>
                    <li>Portfolio Historie</li>
                </Link>
                <Link to={{pathname: `/settings/deleteProfileSettings/${userData.uid}`}}>
                    <li>Profil löschen</li>
                </Link>
            </ul>
        </div>
    );
}

export default SettingsMenu;