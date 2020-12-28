import firebase from '../../firebase/Config';

export const createArticle = (title, articleText, tags) => {
    return async function(dispatch) {
        const article = await firebase.createArticle(title, articleText, tags);
        console.log(article);
        dispatch({type: 'CREATE_ARTICLE', payload: article});
    }
}