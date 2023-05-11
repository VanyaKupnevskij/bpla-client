import { useContext, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { QueryContext } from '../context/queryContext';

export default function FilterTextInput({
  id,
  required = false,
  multiline = false,
  label,
  name,
  placeholder,
  xs,
  sm,
  md,
  lg,
}) {
  const [value, setValue] = useState('');
  const { setItemQuery, filteredQueries } = useContext(QueryContext);

  function handleReadyQuery() {
    const [query] = filteredQueries.current[name + '_str'];
    setValue(query ?? '');
  }

  useEffect(() => {
    setTimeout(handleReadyQuery, 1);
  }, []);

  function handleBlur() {
    setItemQuery(name, value.trim(), true, true);
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <TextField
        id={id}
        required={required}
        label={label}
        value={value}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        multiline={multiline}
        fullWidth
        variant="standard"
      />
    </Grid>
  );
}
