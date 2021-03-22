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
    const [userVotingRefs, setUserVotingRefs] = useState([]);

    async function setNewArticleVoting(voting, votingPoints) {
        await firebase.firestore().collection('articles').doc(id).update({
            voting: voting,
        });
        setArticleVoting(voting);
        const articleData = await firebase.firestore().collection('articles').doc(id).get();
        const creatorData = await firebase.firestore().collection('users').doc(articleData.data().creatorId).get();
        await firebase.firestore().collection('users').doc(articleData.data().creatorId).update({
            shareCounter: creatorData.data().shareCounter + votingPoints,
        });
        await firebase.firestore().collection('users').doc(articleData.data().creatorId).collection('votings').doc().set({
            votingRef: firebase.firestore().doc(`/articles/${id}`),
        })
        console.log('Beitrag Voting wurde erfolgreich gewertet.');
    }

    // Wird durch [] beim Start einmalig aufgerufen.
    useEffect(() => {
        const getArticleVoting = async () => {
            const currentVoting = await (await firebase.firestore().collection('articles').doc(id).get()).data().voting;
            setArticleVoting(currentVoting);
        }
        getArticleVoting();
        const getUserVotings = async () => {
            const articleData = await firebase.firestore().collection('articles').doc(id).get();
            const userVotings = await firebase.firestore().collection('users').doc(articleData.data().creatorId).collection('votings').get();
            setUserVotingRefs(userVotings.docs.map(doc => ({...doc.data().votingRef })));
            
            console.log({...userVotingRefs});
            for (let i = 0; i < userVotingRefs.length; i++) {
                if (userVotingRefs[i].id === id) {
                    console.log('Benutzer hat Voting für ' + id + ' abgegeben.');
                }
            } 
        }
        getUserVotings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className="article-voting-section">
            <button className="voting-button" onClick={() => setNewArticleVoting(articleVoting + 1, 10)}><ArrowDropUp /></button>
            <p>{articleVoting}</p>
            <button className="voting-button" onClick={() => setNewArticleVoting(articleVoting - 1, -5)}><ArrowDropDown /></button>
        </div>
    );
}

export default ArticleVoting;