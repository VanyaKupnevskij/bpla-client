import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { QueryContext } from '../context/queryContext';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Box, Checkbox } from '@mui/material';

export default function Sort() {
  const [sort, setSort] = React.useState('_name');
  const [order, setOrder] = React.useState(false);
  const { submit, filteredQueries, setItemQuery } = React.useContext(QueryContext);

  function handleReadyQuery() {
    if (filteredQueries.current.order) {
      setOrder(filteredQueries.current.order === -1);
    }
    const [sortValue] = filteredQueries.current.sort_str;
    if (sortValue) {
      setSort(sortValue);
    }
  }

  React.useEffect(() => {
    setTimeout(handleReadyQuery, 1);
  }, []);

  const handleChangeSort = (event) => {
    setSort(event.target.value);

    const queryValue = event.target.value === '_name' ? '' : event.target.value;
    setItemQuery('sort', queryValue, true, true);
    submit();
  };

  const handleChangeOrder = (event) => {
    setOrder(event.target.checked);

    const queryValue = event.target.checked ? -1 : 1;
    setItemQuery('order', queryValue, true, true);
    submit();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Checkbox
        icon={<KeyboardDoubleArrowDownIcon />}
        checkedIcon={<KeyboardDoubleArrowUpIcon />}
        checked={order}
        onChange={handleChangeOrder}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Сортування</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Сортування"
          onChange={handleChangeSort}>
          <MenuItem value={'_name'}>По назві</MenuItem>
          <MenuItem value={'maxFlyWeight'}>За злітною масою</MenuItem>
          <MenuItem value={'flyDuration'}>За тривалістю польоту</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
