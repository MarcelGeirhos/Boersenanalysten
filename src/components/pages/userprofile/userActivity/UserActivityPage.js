import React, { useState, useEffect } from 'react';

// own module imports
import UserprofileNavigation from '../UserprofileNavigation';
import Listitem from '../../articleList/listitem/Listitem';
import firebaseConfig from '../../../../firebase/Config';

// css imports
import './UserActivityPage.css';

// third party imports
import firebase from 'firebase/app';

function UserActivityPage() {
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [articleList, setArticleList] = useState([]);
    const [articleCreatedAt, setArticleCreatedAt] = useState("");
    const dateOptions = { year: '2-digit', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'};

    useEffect(() => {
        firebaseConfig.getUserState().then(user => {
            const fetchData = async () => {
                await firebase.firestore().collection('users').doc(user.uid).get().then(
                    snapshot => {
                        setUserData(snapshot.data())
                    }).catch(error => {
                        console.log('Error getting userData ', error);
                    })
                    const dataList = await firebase.firestore().collection('users').doc(user.uid).collection('articles').get();
                    console.log(dataList);
                    dataList.forEach(async (doc) => {
                        const data = await firebase.firestore().collection('users').doc(user.uid).collection('articles').doc(doc.data().id).get();
                        data.data().articleRefs.forEach(async (doc) => {
                            const data2 = await firebase.firestore().collection('articles').doc(doc.id).get();
                            setArticleList(articleList => [...articleList, data2.data()]);
                            setArticleCreatedAt(articleList => [...articleList, data2.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions)]);
                        })
                        setData(data.data());
                        console.log(data.data());
                    })
                }
                fetchData();
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="user-profile-grid-container">
            <UserprofileNavigation selectedTab={1} />
            <div className="user-activity-page">
                <h2>Aktivität</h2>
                {  
                articleList.map((article, index) => (
                <div key={index}>
                    <Listitem id={article.id}
                        title={article.title}
                        tags={article.tags}
                        voting={article.voting}
                        answerCounter={article.answerCounter}
                        views={article.views}
                        creator={article.creator}
                        creatorId={article.creatorId}
                        createdAt={articleCreatedAt[index]} />
                </div>
                ))
                }
            </div>
        </div>
    );
}

export default UserActivityPage;