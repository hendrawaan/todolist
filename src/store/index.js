import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import todo from './todo'

const reducer = combineReducers({
    todo
})

const store = configureStore({
    reducer,
})

export default store;