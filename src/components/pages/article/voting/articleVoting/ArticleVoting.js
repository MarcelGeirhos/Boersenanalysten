import React, { useState, useEffect } from 'react';

// own module imports
import firebaseConfig from '../../../../../firebase/Config';

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
    const [votings, setVotings] = useState([]);
    const [articleVoting, setArticleVoting] = useState(0);

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
        await firebase.firestore().collection('users').doc(articleData.data().creatorId).collection('votings').doc(votings.id).update({
            votingRefs: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().doc(`/articles/${id}`)),
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
        firebaseConfig.getUserState().then(user => {
            const getUserVotings = async () => {
                const votingList = await firebase.firestore().collection('users').doc(user.uid).collection('votings').get();
                console.log(votingList);
                votingList.forEach(async (doc) => {
                    const votings = await firebase.firestore().collection('users').doc(user.uid).collection('votings').doc(doc.data().id).get();
                    setVotings(votings.data());
                    console.log(votings.data().votingRefs);
                    for (let i = 0; i < votings.data().votingRefs.length; i++) {
                        if (votings.data().votingRefs[i].id === id) {
                            document.getElementById("voting-button").style.backgroundColor = "orange";
                            break;
                        } else {
                            // TODO hier weitermachen und Ausgangfarbe setzen und button für Votings verbessern nur className oder id verwenden
                            // für bessere Übersichtlichkeit.
                            document.getElementById("voting-button").style.backgroundColor = "black";
                        }
                    }
                })
            }
            getUserVotings();
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className="article-voting-section">
            <button className="voting-button" id="voting-button" onClick={() => setNewArticleVoting(articleVoting + 1, 10)}><ArrowDropUp /></button>
            <p>{articleVoting}</p>
            <button className="voting-button" id="voting-button" onClick={() => setNewArticleVoting(articleVoting - 1, -5)}><ArrowDropDown /></button>
        </div>
    );
}

export default ArticleVoting;