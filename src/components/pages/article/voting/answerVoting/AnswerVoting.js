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

    async function setNewAnswerVoting(voting) {
        await firebase.firestore().collection('articles').doc(id).collection('answers').doc(props.id).update({
            voting: voting,
        });
        setAnswerVoting(voting);
        console.log('Antworten Voting wurde erfolgreich gewertet.');
    }

    // Wird durch [] beim Start einmalig aufgerufen.
    useEffect(() => {
        const getVoting = async () => {
            const currentVoting = await (await firebase.firestore().collection('articles').doc(id).collection('answers').doc(props.id).get()).data().voting;
            setAnswerVoting(currentVoting);
        }
        getVoting();
    }, []);
    
    return (
        <div className="answer-voting-section">
            <button className="answer-voting-button" onClick={() => setNewAnswerVoting(answerVoting + 1)}><ArrowDropUp /></button>
            <p>{answerVoting}</p>
            <button className="answer-voting-button" onClick={() => setNewAnswerVoting(answerVoting - 1)}><ArrowDropDown /></button>
        </div>
    );
}

export default AnswerVoting;