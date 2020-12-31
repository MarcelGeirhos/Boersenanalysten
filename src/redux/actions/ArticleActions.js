import firebase from '../../firebase/Config';

export const createArticle = (title, articleText, tags) => {
    return async function(dispatch) {
        const article = await firebase.createArticle(title, articleText, tags);
        console.log(article);
        dispatch({type: 'CREATE_ARTICLE', payload: article});
    }
}

export const getArticleList = () => {
    return async function(dispatch) {
        const articleList = await firebase.getArticleList();
        console.log(articleList);
        dispatch({type: 'GET_ARTICLE_LIST', payload: articleList});
    }
}