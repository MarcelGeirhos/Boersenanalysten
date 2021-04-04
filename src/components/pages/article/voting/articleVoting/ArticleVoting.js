import React, { useState, useEffect } from 'react';

// own module imports
import firebaseConfig from '../../../../../firebase/Config';

// css imports
import './ArticleVoting.css';

// third party imports
import firebase from 'firebase/app';
import { useParams } from "react-router-dom";

// material-ui icon imports
import {
    ArrowDropUp,
    ArrowDropDown,
} from '@material-ui/icons';

const ArticleVoting = () => {
    const { id } = useParams();
    const [votings, setVotings] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [articleVoting, setArticleVoting] = useState(0);

    async function setNewArticleVoting(voting, votingPoints, isUpVote) {
        await firebase.firestore().collection('articles').doc(id).update({
            voting: voting,
        });
        setArticleVoting(voting);
        const articleData = await firebase.firestore().collection('articles').doc(id).get();
        const creatorData = await firebase.firestore().collection('users').doc(articleData.data().creatorId).get();
        await firebase.firestore().collection('users').doc(articleData.data().creatorId).update({
            shareCounter: creatorData.data().shareCounter + votingPoints,
        });
        if (isUpVote === true) {
            document.getElementById("up-voting-button").style.backgroundColor = "rgba(211, 84, 0, 0.85)";
            await firebase.firestore().collection('users').doc(currentUser.uid).collection('votings').doc(votings.id).update({
                upVotingRefs: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().doc(`/articles/${id}`)),
            })
        } else {
            document.getElementById("down-voting-button").style.backgroundColor = "rgba(211, 84, 0, 0.85)";
            await firebase.firestore().collection('users').doc(currentUser.uid).collection('votings').doc(votings.id).update({
                downVotingRefs: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().doc(`/articles/${id}`)),
            })
        }
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
            firebaseConfig.getUserState().then(async (user) => {
                setCurrentUser(user);
                const votingList = await firebase.firestore().collection('users').doc(user.uid).collection('votings').get();
                votingList.forEach(async (doc) => {
                    const votings = await firebase.firestore().collection('users').doc(user.uid).collection('votings').doc(doc.data().id).get();
                    setVotings(votings.data());
                    // Up Voting setzen
                    for (let i = 0; i < votings.data().upVotingRefs.length; i++) {
                        if (votings.data().upVotingRefs[i].id === id) {
                            document.getElementById("up-voting-button").style.backgroundColor = "rgba(211, 84, 0, 0.85)";
                            document.getElementById("up-voting-button").style.cursor = "default";
                            break;
                        } else {
                            document.getElementById("up-voting-button").style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                            document.getElementById("up-voting-button").style.cursor = "cursor";
                        }
                    }
                    // Down Voting setzen
                    for (let i = 0; i < votings.data().downVotingRefs.length; i++) {
                        if (votings.data().downVotingRefs[i].id === id) {
                            document.getElementById("down-voting-button").style.backgroundColor = "rgba(211, 84, 0, 0.85)";
                            document.getElementById("down-voting-button").style.cursor = "default";
                            break;
                        } else {
                            document.getElementById("down-voting-button").style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                            document.getElementById("down-voting-button").style.cursor = "cursor";
                        }
                    }
                })
            });
        }
        getUserVotings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className="article-voting-section">
            <button className="voting-button" id="up-voting-button" onClick={() => setNewArticleVoting(articleVoting + 1, 10, true)}><ArrowDropUp /></button>
            <p>{articleVoting}</p>
            <button className="voting-button" id="down-voting-button" onClick={() => setNewArticleVoting(articleVoting - 1, -5, false)}><ArrowDropDown /></button>
        </div>
    );
}

export default ArticleVoting;