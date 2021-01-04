import React, { useState, useEffect } from 'react';

// own module imports
import Listitem from './listitem/Listitem';
import Mainbutton from '../../gui/buttons/Mainbutton';

// css imports
import './ArticleListPage.css';

// third party imports
import firebase from 'firebase/app';

function ArticleListPage() {
    const [articleList, setArticleList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await firebase.firestore().collection('articles').get();
            setArticleList(data.docs.map(doc => ({...doc.data()})));
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
                    <Listitem title={article.title}
                        tags={article.tags}
                        voting={article.voting}
                        answerCounter={article.answerCounter}
                        views={article.views}></Listitem>
                ))
                }
            </ul>
        </div>
    );
}

export default ArticleListPage;