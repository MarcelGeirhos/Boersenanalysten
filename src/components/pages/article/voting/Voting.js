import React from 'react';

// css imports
import './Voting.css';

// material-ui icon imports
import {
    ArrowDropUp,
    ArrowDropDown,
} from '@material-ui/icons';

// third party imports
import firebase from 'firebase/app';
import { useParams } from "react-router-dom";

const Voting = (props) => {
    const { id } = useParams();

    const setVoting = async (vote) => {
        const article = await firebase.firestore().collection('articles').doc(id).get();
        await firebase.firestore().collection('articles').doc(id).update({
            voting: article.data().voting + vote,
        });
        console.log('Voting wurde erfolgreich gewertet.');
    }

    return (
        <div className="voting-section">
            <button className="voting-button" onClick={() => setVoting(1)}><ArrowDropUp /></button>
            <p>{props.voting}</p>
            <button className="voting-button" onClick={() => setVoting(-1)}><ArrowDropDown /></button>
        </div>
    );
}

export default Voting;