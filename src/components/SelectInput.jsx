import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../context/formContext';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function SelectInput({ variants, label, name, title, xs, sm, md, lg }) {
  const { states } = useContext(FormContext);
  let initValue = variants.indexOf(states.current[name]);
  initValue = initValue == -1 ? '' : initValue;
  const [value, setValue] = useState(initValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    states.current[name] = variants[value];
  }, [value]);

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-select-small">{label}</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={value}
          name={name}
          label={label}
          onChange={handleChange}>
          <MenuItem value="">
            <em>немає</em>
          </MenuItem>
          {variants.map((variant, ind) => (
            <MenuItem value={ind} key={variant}>
              {variant}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
