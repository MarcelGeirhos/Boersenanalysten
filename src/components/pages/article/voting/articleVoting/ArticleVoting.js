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
    const [articleVoting, setArticleVoting] = useState(0);

    async function setNewArticleVoting(voting) {
        await firebase.firestore().collection('articles').doc(id).update({
            voting: voting,
        });
        setArticleVoting(voting);
        console.log('Beitrag Voting wurde erfolgreich gewertet.');
    }

    // Wird durch [] beim Start einmalig aufgerufen.
    useEffect(() => {
        const getArticleVoting = async () => {
            const currentVoting = await (await firebase.firestore().collection('articles').doc(id).get()).data().voting;
            setArticleVoting(currentVoting);
        }
        getArticleVoting();
    }, []);
    
    return (
        <div className="article-voting-section">
            <button className="voting-button" onClick={() => setNewArticleVoting(articleVoting + 1)}><ArrowDropUp /></button>
            <p>{articleVoting}</p>
            <button className="voting-button" onClick={() => setNewArticleVoting(articleVoting - 1)}><ArrowDropDown /></button>
        </div>
    );
}

export default ArticleVoting;