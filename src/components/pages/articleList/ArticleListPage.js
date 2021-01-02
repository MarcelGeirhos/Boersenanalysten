import React, { useState, useEffect } from 'react';

// own module imports
import Listitem from './listitem/Listitem';
import Mainbutton from '../../gui/buttons/Mainbutton';
import { getArticleList } from '../../../redux/actions/ArticleActions';

// css imports
import './ArticleListPage.css';

// third party imports
import firebase from 'firebase/app';

function ArticleListPage() {
    const [articleList, setArticleList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await firebase.firestore().collection('articles').get()
            console.log(data);
            setArticleList(data.docs.map(doc => ({...doc.data()})))
        }
        fetchData();
    }, [])

    return (
        <div>
            <div className="articlelist-header">
                <h1>Beste Beiträge</h1>
                <Mainbutton link="/createArticle">Beitrag erstellen</Mainbutton>
            </div>
            <ul className="articlelist">
                {
                articleList.map(article => (
                    <li>{article.title}</li>
                ))
                }
            </ul>
        </div>
    );
}

export default ArticleListPage;