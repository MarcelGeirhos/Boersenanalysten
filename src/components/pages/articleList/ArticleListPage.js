import React, { useState, useEffect } from 'react';

// own module imports
import Listitem from './listitem/Listitem';
import Mainbutton from '../../gui/buttons/mainbutton/Mainbutton';
import FilterSettings from './filterSettings/FilterSettings';

// css imports
import './ArticleListPage.css';

// material-ui icon imports
import {
    Tune,
} from '@material-ui/icons';

// third party imports
import firebase from 'firebase/app';

function ArticleListPage() {
    const [articleList, setArticleList] = useState([]);
    const [showFilterSettings, setShowFilterSettings] = useState(false);
    const onClick = () => setShowFilterSettings(!showFilterSettings);

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
            <div className="articlelist-filter">
            <button type="submit" value="Filter" onClick={onClick}><Tune />Filter</button>
            </div>
            { showFilterSettings ? <FilterSettings /> : null }
                {
                articleList.map(article => (
                    <Listitem id={article.id}
                        title={article.title}
                        tags={article.tags}
                        voting={article.voting}
                        answerCounter={article.answerCounter}
                        views={article.views}></Listitem>
                ))
                }
        </div>
    );
}

export default ArticleListPage;