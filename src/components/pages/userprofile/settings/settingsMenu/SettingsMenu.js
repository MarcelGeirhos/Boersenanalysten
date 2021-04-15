import React, { useEffect } from 'react';

// own module imports
import firebaseConfig from '../../../../../firebase/Config';

// css imports
import './SettingsMenu.css';

// third party imports
import firebase from 'firebase/app';
import { Link, useParams } from "react-router-dom";

const SettingsMenu = ({ parentCallbackUserData }) => {
    const { id } = useParams();

    useEffect(() => {
        firebaseConfig.getUserState().then(user => {
            const fetchData = async () => {
                await firebase.firestore().collection('users').doc(id).get().then(
                    snapshot => {
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
                <Link to={{pathname: `/settings/profileSettings/${id}`}}>
                    <li>Profil</li>
                </Link>
                <Link to={{pathname: `/settings/emailSettings/${id}`}}>
                    <li>E-Mail</li>
                </Link>
                <Link to={{pathname: `/settings/passwordSettings/${id}`}}>
                    <li>Passwort</li>
                </Link>
                <Link to={{pathname: `/settings/portfolioHistorySettings/${id}`}}>
                    <li>Portfolio Historie</li>
                </Link>
                <Link to={{pathname: `/settings/deleteProfileSettings/${id}`}}>
                    <li>Profil löschen</li>
                </Link>
            </ul>
        </div>
    );
}

export default SettingsMenu;