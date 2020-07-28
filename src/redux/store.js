import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import Constants from '../common/Constants';

const composeEnhancers = Constants.DEBUG
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose; // Used for Redux dev tools

const middleware = [reduxThunk, Constants.DEBUG && logger].filter(Boolean);

const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
