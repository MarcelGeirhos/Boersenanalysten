const article = (
    state = {
        article: {}
    },
    action) => {
        if (action.type === 'CREATE_ARTICLE') {
            state = {...state, article: action.payload}
        } else if (action.type === 'GET_ARTICLE_LIST') {
            state = {...state, article: action.payload}
        }
        return state;
    }

export default article;