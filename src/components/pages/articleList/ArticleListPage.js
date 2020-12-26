import React from 'react';

// own module imports
import Listitem from './listitem/listitem';
import Mainbutton from '../../gui/buttons/Mainbutton';

// css imports
import './ArticleListPage.css';

function ArticleListPage() {
    // TODO
    const list = ['a', 'b', 'c'];

    return (
        <div>
            <div className="articlelist-header">
                <h1>Beste Beiträge</h1>
                <Mainbutton link="/createArticle">Beitrag erstellen</Mainbutton>
            </div>
            <ul className="articlelist">
                {list.map(item => {
                    return <Listitem key={item}>{item}</Listitem>
                })}
            </ul>
        </div>
    );
}

export default ArticleListPage;