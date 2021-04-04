import React, { useState, useEffect } from 'react';

// own module imports
import Listitem from './listitem/Listitem';
import Mainbutton from '../../gui/buttons/mainbutton/Mainbutton';
import FilterSettings from './filterSettings/FilterSettings';

// css imports
import './ArticleListPage.css';

// material-ui imports
import { 
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core';

// material-ui icon imports
import { ExpandMore } from '@material-ui/icons';

// third party imports
import firebase from 'firebase/app';

function ArticleListPage() {
    const [articleList, setArticleList] = useState([]);
    const [articleCreatedAt, setArticleCreatedAt] = useState("");
    const dateOptions = { year: '2-digit', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'};

    useEffect(() => {
        const fetchData = async () => {
            const articleData = await firebase.firestore().collection('articles').orderBy("createdAt", "desc").limit(5).get();
            setArticleList(articleData.docs.map(doc => ({...doc.data()})));
            setArticleCreatedAt(articleData.docs.map(doc => (doc.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions))));
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadMoreArticles = () => {
        const currentArticleData = firebase.firestore().collection('articles')
                                .orderBy("createdAt", "desc")
                                .limit(5);
        return currentArticleData.get().then(async (documentSnapshots) => {
            // Letzter sichtbare Beitrag
            const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
            console.log("last", lastVisible.data());
          
            // Neue Abfrage die mit dem letzten sichtbaren Dokument beginnt und
            // die nächsten 10 Beiträge lädt
            const next = await firebase.firestore().collection('articles')
                    .orderBy("createdAt", "desc")
                    .startAfter(lastVisible)
                    .limit(5).get();
            setArticleList(next.docs.map(doc => ({...doc.data()})));
        });
    }

    // Verbindung zu FilterSettings Komponente um auf die gefilterte
    // Beitragsliste Zugriff zu bekommen.
    const callbackFilteredList = (filteredList) => {
        console.log(filteredList);
        setArticleList(filteredList.docs.map(doc => ({...doc.data()})));
    }

    return (
        <div>
            <div className="articlelist-header">
                <h1>Beiträge</h1>
                <Mainbutton link="/createArticle">Beitrag erstellen</Mainbutton>
            </div>
            <div className="articlelist-filter">
                <Accordion className="accordion">
                    <AccordionSummary
                        className="accordion-summary"
                        expandIcon={<ExpandMore />}>
                        <p>Filter</p>
                    </AccordionSummary>
                    <AccordionDetails className="accordion-content">
                        <FilterSettings filteredArticleList={callbackFilteredList} />
                    </AccordionDetails>
                </Accordion>
            </div>
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
            <div className="load-more-articles">
                <Mainbutton onClick={loadMoreArticles}>Mehr laden</Mainbutton>
            </div>
        </div>  
    );
}

export default ArticleListPage;