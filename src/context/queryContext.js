import { createContext } from 'react';

function setItemQuery(key, value) {}
function clearQuery() {}
function onChange() {}
function onReady() {}
function submit() {}

export const QueryContext = createContext({
  query: '',
  setItemQuery: setItemQuery,
  clearQuery: clearQuery,
  onChange: onChange,
  submit: submit,
  onReady: onReady,
  isReady: false,
  filteredQueries: {},
});
