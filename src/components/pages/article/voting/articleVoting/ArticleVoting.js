import React, { useState, useEffect } from 'react';

// css imports
import './ArticleVoting.css';

// material-ui icon imports
import {
    ArrowDropUp,
    ArrowDropDown,
} from '@material-ui/icons';

// third party imports
import firebase from 'firebase/app';
import { useParams } from "react-router-dom";

const ArticleVoting = () => {
    const { id } = useParams();
    const [voting, setVoting] = useState(0);

    async function setNewVoting(voting) {
        await firebase.firestore().collection('articles').doc(id).update({
            voting: voting,
        });
        setVoting(voting);
        console.log('Beitrag Voting wurde erfolgreich gewertet.');
    }

    // Wird durch [] beim Start einmalig aufgerufen.
    useEffect(() => {
        const getVoting = async () => {
            const currentVoting = await (await firebase.firestore().collection('articles').doc(id).get()).data().voting;
            setVoting(currentVoting);
        }
        getVoting();
    }, []);
    
    return (
        <div className="voting-section">
            <button className="voting-button" onClick={() => setNewVoting(voting + 1)}><ArrowDropUp /></button>
            <p>{voting}</p>
            <button className="voting-button" onClick={() => setNewVoting(voting - 1)}><ArrowDropDown /></button>
        </div>
    );
}

export default ArticleVoting;