import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';

const initalState = {};

const middlewares = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initalState,
  composeEnhances(applyMiddleware(...middlewares))
);

export default store;
