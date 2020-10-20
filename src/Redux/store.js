import {applyMiddleware, createStore, combineReducers} from 'redux';
import player_reducer from './player_reducer';
import recruiter_reducer from './recruiter_reducer';
import promiseMiddlware from 'redux-promise-middleware';

const rootReducer = combineReducers({
    playerReducer: player_reducer,
    recruiterReducer: recruiter_reducer  
})

export default createStore(rootReducer, applyMiddleware(promiseMiddlware));