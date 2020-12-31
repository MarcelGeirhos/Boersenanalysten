import React, { useState, useEffect } from 'react';

// own module imports
import Listitem from './listitem/Listitem';
import Mainbutton from '../../gui/buttons/Mainbutton';
import { getArticleList } from '../../../redux/actions/ArticleActions';
import firebase from '../../../firebase/Config';

// css imports
import './ArticleListPage.css';

// third party imports
import { useDispatch } from 'react-redux';

function ArticleListPage() {
    // TODO durch richtige Daten aus der Datenbank ersetzen.
    let article = [];
    const [articleList, setArticleList] = useState([]);

    const getArticles = async () => {
        const list = [];
        let snapshot = firebase.getArticleList().then(articleList => {
            console.log(articleList);
        })
        //snapshot.forEach(element => {
        //    list.push(element.data())
        //});
        setArticleList([...articleList]);
    }

    useEffect(() => {
        {/*firebase.getArticleList().then(articleList => {
            console.log(articleList);
            article = articleList;
            console.log(article);
        })*/}
        getArticles();
    }, []);

    return (
        <div>
            <div className="articlelist-header">
                <h1>Beste Beiträge</h1>
                <Mainbutton link="/createArticle">Beitrag erstellen</Mainbutton>
            </div>
            <ul className="articlelist">
                {/*{list.map(item => {
                    return <Listitem key={item}>{item}</Listitem>
                })}*/}
                {console.log("Test" + articleList)}
                {articleList.map(item => {
                    console.log("Title: " + item.title);
                    return <Listitem title={item.title} key={item.title}>{item.title}</Listitem>
                })}
            </ul>
        </div>
    );
}

export default ArticleListPage;