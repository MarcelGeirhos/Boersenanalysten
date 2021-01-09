import React, { useState, useEffect } from 'react';

// own module imports
import TextEditor from '../../gui/inputs/textEditor/TextEditor';

// css imports
import './ArticlePage.css';

// third party imports
import firebase from 'firebase/app';
import { useParams } from "react-router-dom";

function ArticlePage() {
    const { id } = useParams();
    const [articleData, setArticleData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await firebase.firestore().collection('articles').doc(id).get();
            setArticleData({...data.data()});
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="article-page">
            <h1>{articleData.title}</h1>
            <p>{articleData.articleText}</p>
            <p>{articleData.tags}</p>
            <TextEditor />
        </div>
    );
}

export default ArticlePage;