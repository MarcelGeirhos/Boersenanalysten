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
            const articleData = await firebase.firestore().collection('articles').get();
            setArticleList(articleData.docs.map(doc => ({...doc.data()})));
            setArticleCreatedAt(articleData.docs.map(doc => (doc.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions))));
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="articlelist-header">
                <h1>Beste Beiträge</h1>
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
                        <FilterSettings />
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
           </div>
    );
}

export default ArticleListPage;


/*<button type="submit" value="Filter" onClick={onClick}><Tune />Filter</button>
            </div>
            { showFilterSettings ? <FilterSettings /> : null }
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
                            createdAt={articleCreatedAt[index]}></Listitem>
                    </div>
                ))
                }*/