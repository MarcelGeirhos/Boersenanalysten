import React, { useState, useEffect } from 'react';

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
    const [voting, setVoting] = useState(0);

    useEffect((vote) => {
        const fetchData = async () => {
            console.log(voting);
            const article = await firebase.firestore().collection('articles').doc(id).get();
            await firebase.firestore().collection('articles').doc(id).update({
                voting: article.data().voting + voting,
            });
            console.log('Voting wurde erfolgreich gewertet.');
        }
        fetchData(vote);
    }, [voting]);

    /*const setVoting = async (vote) => {
        const article = await firebase.firestore().collection('articles').doc(id).get();
        await firebase.firestore().collection('articles').doc(id).update({
            voting: article.data().voting + vote,
        });
        setArticle({article});
        console.log('Voting wurde erfolgreich gewertet.');
    }*/
    
    return (
        <div className="voting-section">
            <button className="voting-button" onClick={() => setVoting(1)/*setVoting(1)*/}><ArrowDropUp /></button>
            <p>{props.voting}</p>
            <button className="voting-button" onClick={() => setVoting(-1)/*setVoting(-1)*/}><ArrowDropDown /></button>
        </div>
    );
}

export default Voting;