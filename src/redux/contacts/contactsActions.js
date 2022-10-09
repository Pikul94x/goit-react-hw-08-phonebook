import { createAction } from '@reduxjs/toolkit';
import { FILTER } from './contactsTypes';

export const filterContact = createAction(FILTER, event => ({
  payload: event.currentTarget.value,
}));
