// own module imports
import RootReducer from '../reducers/RootReducer';

// third party imports
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);
const store = createStore(RootReducer, middleware);

export default store;