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
    const [articleList, setArticleList] = useState([]);
    const getArticles = async () => {
        const list = [];
        let snapshot = firebase.getArticleList().then(articleList => {
            console.log(articleList);
        })
        //snapshot.forEach(element => {
        //    list.push(element.data())
        //});
        setArticleList([articleList]);
    }

    useEffect(() => {
        {/*firebase.getArticleList().then(articleList => {
            console.log(articleList);
            article = articleList;
            console.log(article);
        })*/}
        getArticles();
    }, []);

    function getArticleListFunction(item) {
        let title = item.title;
        console.log("Title: " + title);
        return title;
    }

    function test() {
        console.log("Test " + articleList.length);
        for (let i = 0; i < articleList.length; i++) {
            console.log(articleList);
            return <p>{articleList[i].title}</p>
        }
    }

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
                
                {/*{articleList.map(item => {
                    console.log("Title: " + item);
                    return <Listitem title={item.title} key={item.title}>{item.title}</Listitem>
                })}*/}
                {test()}
            
            </ul>
        </div>
    );
}

export default ArticleListPage;