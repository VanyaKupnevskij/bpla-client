import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../context/formContext';

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({ variants, label, name, title, xs, sm, md, lg }) {
  const { states } = useContext(FormContext);
  const [values, setValues] = useState(states.current[name]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValues(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    states.current[name] = values;
  }, [values]);

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          id="demo-multiple-chip"
          labelId="demo-multiple-chip-label"
          name={name}
          value={values}
          multiple
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {variants.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
