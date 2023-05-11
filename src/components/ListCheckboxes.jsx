import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { QueryContext } from '../context/queryContext';

export default function ListCheckboxes({ name, listData = [] }) {
  const [listChecked, setListChecked] = useState(new Array(listData.length).fill(false));
  const { setItemQuery, filteredQueries } = useContext(QueryContext);

  function handleReadyQuery() {
    const listQuery = filteredQueries.current[name + '_str'];
    let newList = [...listChecked];

    for (let value of listQuery) {
      const index = listData.indexOf(value);
      newList[index] = true;
    }

    setListChecked(newList);
  }

  useEffect(() => {
    setTimeout(handleReadyQuery, 1);
  }, []);

  function handleChange(id) {
    let newList = [...listChecked];
    newList[id] = !newList[id];
    setListChecked(newList);

    setItemQuery(name, listData[id], newList[id]);
  }

  return (
    <FormGroup>
      {listData.map((data, ind) => (
        <FormControlLabel
          key={ind}
          control={<Checkbox checked={listChecked[ind]} />}
          onChange={() => handleChange(ind)}
          label={data}
        />
      ))}
    </FormGroup>
  );
}
