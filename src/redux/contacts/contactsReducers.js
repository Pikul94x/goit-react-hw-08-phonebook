import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { filterContact } from './contactsActions';

const filter = createReducer('', {
  [filterContact]: (_, { payload }) => payload,
});

export default combineReducers({ filter });
