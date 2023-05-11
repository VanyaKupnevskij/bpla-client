import { useEffect, useRef } from 'react';
import { QueryContext } from '../context/queryContext';
import { useSearchParams } from 'react-router-dom';

import listParameters from '../context/listParameters';

export default function useQueryBuilder() {
  const [searchParams, setSearchParams] = useSearchParams({});

  const query = useRef('');
  const queriesParameter = useRef({});
  const filteredQueries = useRef({});
  const onReady = useRef(null);
  const isReady = useRef(false);
  const onChange = useRef(null);

  useEffect(() => {
    isReady.current = false;
    initParameters();
    readUrlParams();
  }, []);

  function readUrlParams() {
    const values = searchParams.entries();
    for (let [key, value] of values) {
      if (key.includes('_str')) {
        key = key.replace('_str', '');
        if (queriesParameter.current[key] === undefined) {
          queriesParameter.current[key] = new Set([value]);
        } else {
          queriesParameter.current[key].add(value);
        }
      } else {
        queriesParameter.current[key] = parseInt(value);
      }
    }

    if (values.length !== 0) {
      buildQuery();
      isReady.current = true;
      if (onReady.current) onReady.current();
    }
  }

  function buildQuery() {
    const queries = formatedQueries();
    setQuery(queries);
  }

  function formatedQueries() {
    let resultQueries = [];
    const queries = filtringQueries();

    for (let [key, value] of Object.entries(queries)) {
      if (key.includes('_str')) {
        const listQueries = Array.from(value);
        for (let item of listQueries) {
          resultQueries.push(`${key}=${item}`);
        }
      } else {
        resultQueries.push(`${key}=${value}`);
      }
    }

    return resultQueries;
  }

  function filtringQueries() {
    let resultQueries = {};

    for (let [key, value] of Object.entries(queriesParameter.current)) {
      switch (typeof value) {
        case 'object':
          if (resultQueries[`${key}_str`] === undefined) {
            resultQueries[`${key}_str`] = new Set();
          }
          for (let item of value.values()) {
            resultQueries[`${key}_str`].add(item);
          }
          break;

        case 'number':
          if (
            (key.includes('_min') && value === listParameters[key.replace('_min', '')].min) ||
            (key.includes('_max') && value === listParameters[key.replace('_max', '')].max) ||
            (key === 'limit' && value === 0) ||
            (key === 'page' && value === 0) ||
            (key === 'order' && value === 1)
          )
            break;

          resultQueries[key] = value;
          break;
      }
    }

    filteredQueries.current = resultQueries;

    return resultQueries;
  }

  function setQuery(queries) {
    if (queries.length !== 0) {
      query.current = '?' + queries.join('&');
    } else {
      query.current = '';
    }
  }

  function initParameters() {
    initFilters();

    queriesParameter.current.text = new Set();
    queriesParameter.current.limit = 0;
    queriesParameter.current.page = 0;
    queriesParameter.current.order = 1;
    queriesParameter.current.sort = new Set();
  }

  function initFilters() {
    for (let key in listParameters) {
      if (listParameters[key].isFilter) {
        switch (listParameters[key].type) {
          case 'TextInput':
          case 'SelectInput':
          case 'MultipleSelect':
            queriesParameter.current[listParameters[key].name] = new Set();
            break;
          case 'NumberSlider':
            queriesParameter.current[`${listParameters[key].name}_min`] = listParameters[key].min;
            queriesParameter.current[`${listParameters[key].name}_max`] = listParameters[key].max;
            break;
        }
      }
    }
  }

  function setItemQuery(key, value, isAppend = true, replaceText = false) {
    if (queriesParameter.current[key] === undefined) return;

    if (typeof value == 'string') {
      if (value === '') {
        queriesParameter.current[key].clear();
      } else {
        if (replaceText) {
          queriesParameter.current[key].clear();
        }

        if (isAppend) {
          queriesParameter.current[key].add(value);
        } else {
          queriesParameter.current[key].delete(value);
        }
      }
    } else if (typeof value == 'number') {
      queriesParameter.current[key] = value;
    }

    if (key !== 'sort' && key !== 'page' && key !== 'order') {
      queriesParameter.current.page = 0;
    }

    buildQuery();
  }

  function clearQuery() {
    initFilters();
    buildQuery();
  }

  function submit() {
    let queries = filtringQueries();
    for (let [key, query] of Object.entries(queries)) {
      if (key.includes('_str')) {
        queries[key] = Array.from(query);
      }
    }
    setSearchParams({ ...queries });

    onChange.current();
  }

  function QueryProvider({ children }) {
    return (
      <QueryContext.Provider
        value={{
          query,
          setItemQuery,
          clearQuery,
          onChange,
          submit,
          onReady,
          isReady,
          filteredQueries,
        }}>
        {children}
      </QueryContext.Provider>
    );
  }

  return {
    query,
    setItemQuery,
    clearQuery,
    onChange,
    submit,
    onReady,
    isReady,
    filteredQueries,
    QueryProvider,
  };
}
