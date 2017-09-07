import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import { stripeInit } from '../sagas/stripe';
import { authInit } from '../sagas/auth';
import { photosInit } from '../sagas/photos';

const logger = createLogger();
export const sagaMiddleware = createSagaMiddleware(
  stripeInit,
  authInit,
  photosInit,
);
export const createNewStore = () => createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(sagaMiddleware),
    applyMiddleware(logger)
  )
);
const store = createNewStore();
export default store;
