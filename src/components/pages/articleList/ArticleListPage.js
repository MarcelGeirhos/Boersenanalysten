import React, { useState, useEffect } from 'react';

// own module imports
import FilterSettings from './filterSettings/FilterSettings';
import Mainbutton from '../../gui/buttons/mainbutton/Mainbutton';
import ArticleListitem from './../../gui/outputs/articleListitem/ArticleListitem';

// css imports
import './ArticleListPage.css';

// material-ui imports
import { 
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    ButtonGroup
} from '@material-ui/core';

// material-ui icon imports
import { ExpandMore } from '@material-ui/icons';

// third party imports
import firebase from 'firebase/app';

function ArticleListPage() {
    const [articleList, setArticleList] = useState([]);
    const [sortCriteria, setSortCriteria] = useState("createdAt");
    const [articleCreatedAt, setArticleCreatedAt] = useState("");
    const [selectedSortButton, setSelectedSortButton] = useState(0);
    const dateOptions = { year: '2-digit', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'};

    useEffect(() => {
        const fetchData = async () => {
            const articleData = await firebase.firestore().collection('articles').orderBy(sortCriteria, "desc").limit(10).get();
            setArticleList(articleData.docs.map(doc => ({...doc.data()})));
            setArticleCreatedAt(articleData.docs.map(doc => (doc.data().createdAt.toDate().toLocaleDateString("de-DE", dateOptions))));
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(async () => {
        const sortedArticleList = await firebase.firestore().collection('articles')
            .orderBy(sortCriteria, "desc")
            .limit(10).get();
        setArticleList(sortedArticleList.docs.map(doc => ({...doc.data()})));
    }, [sortCriteria])

    const loadMoreArticles = () => {
        const currentArticleData = firebase.firestore().collection('articles')
                                .orderBy(sortCriteria, "desc")
                                .limit(10);
        return currentArticleData.get().then(async (documentSnapshots) => {
            // Letzter sichtbare Beitrag
            // TODO funktioniert nur 1x danach werden nicht die nächsten Beiträge in
            // die Liste geladen. Voting, Antworten und Ansichten Sortierung funktioniert
            // Erstellungsdatum noch nicht.
            const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
            console.log("last", lastVisible.data());
          
            // Neue Abfrage die mit dem letzten sichtbaren Dokument beginnt und
            // die nächsten 10 Beiträge lädt
            const next = await firebase.firestore().collection('articles')
                    .orderBy(sortCriteria, "desc")
                    .startAfter(lastVisible)
                    .limit(10).get();
            setArticleList(next.docs.map(doc => ({...doc.data()})));
        });
    }

    // Verbindung zu FilterSettings Komponente um auf die gefilterte
    // Beitragsliste Zugriff zu bekommen.
    const callbackFilteredList = (filteredList) => {
        console.log(filteredList);
        setArticleList(filteredList.docs.map(doc => ({...doc.data()})));
    }

    const sortArticleList = async (selectedButton) => {
        if (selectedButton === 0) {
            setSelectedSortButton(0);
            setSortCriteria("createdAt");
        } else if (selectedButton === 1) {
            setSelectedSortButton(1);
            setSortCriteria("voting");
        } else if (selectedButton === 2) {
            setSelectedSortButton(2);
            setSortCriteria("answerCounter");
        } else if (selectedButton === 3) {
            setSelectedSortButton(3);
            setSortCriteria("views");
        }
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
            <div className="articlelist-button-group">
                <ButtonGroup color="primary" size="small" variant="text">
                    <Button onClick={() => sortArticleList(0)} color={selectedSortButton === 0 ? "secondary" : "primary"}>Neuste</Button>
                    <Button onClick={() => sortArticleList(1)} color={selectedSortButton === 1 ? "secondary" : "primary"}>Voting</Button>
                    <Button onClick={() => sortArticleList(2)} color={selectedSortButton === 2 ? "secondary" : "primary"}>Antworten</Button>
                    <Button onClick={() => sortArticleList(3)} color={selectedSortButton === 3 ? "secondary" : "primary"}>Ansichten</Button>
                </ButtonGroup>
            </div>
            {  
            articleList.map((article, index) => (
                <div key={index}>
                    <ArticleListitem id={article.id}
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