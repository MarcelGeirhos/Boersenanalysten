import React, { useState, useEffect } from 'react';

// css imports
import './AnswerVoting.css';

// material-ui icon imports
import {
    ArrowDropUp,
    ArrowDropDown,
} from '@material-ui/icons';

// third party imports
import firebase from 'firebase/app';
import { useParams } from "react-router-dom";

const AnswerVoting = (props) => {
    const { id } = useParams();
    const [answerVoting, setAnswerVoting] = useState(0);

    async function setNewAnswerVoting(voting, votingPoints) {
        await firebase.firestore().collection('articles').doc(id).collection('answers').doc(props.id).update({
            voting: voting,
        });
        setAnswerVoting(voting);
        const answerData = await firebase.firestore().collection('articles').doc(id).collection('answers').doc(props.id).get();
        const creatorData = await firebase.firestore().collection('users').doc(answerData.data().creatorId).get();
        await firebase.firestore().collection('users').doc(answerData.data().creatorId).update({
            shareCounter: creatorData.data().shareCounter + votingPoints,
        });
        console.log('Antworten Voting wurde erfolgreich gewertet.');
    }

    // Wird durch [] beim Start einmalig aufgerufen.
    useEffect(() => {
        const getAnswerVoting = async () => {
            const currentVoting = await (await firebase.firestore().collection('articles').doc(id).collection('answers').doc(props.id).get()).data().voting;
            setAnswerVoting(currentVoting);
        }
        getAnswerVoting();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className="answer-voting-section">
            <button className="voting-button" onClick={() => setNewAnswerVoting(answerVoting + 1, 10)}><ArrowDropUp /></button>
            <p>{answerVoting}</p>
            <button className="voting-button" onClick={() => setNewAnswerVoting(answerVoting - 1, -5)}><ArrowDropDown /></button>
        </div>
    );
}

export default AnswerVoting;