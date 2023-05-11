import * as React from 'react';
import Slider from '@mui/material/Slider';
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { QueryContext } from '../context/queryContext';

function valuetext(value) {
  return `${value}`;
}

const minDistance = 10;

export default function DoubleSlider({ name, min = 0, max = 100, step = 10, countMarkBase = 5 }) {
  const [value, setValue] = React.useState([min, max]);
  const { setItemQuery, filteredQueries } = React.useContext(QueryContext);

  function handleReadyQuery() {
    const minValue = filteredQueries.current[name + '_min'] ?? value[0];
    const maxValue = filteredQueries.current[name + '_max'] ?? value[1];

    setValue([minValue, maxValue]);
  }

  React.useEffect(() => {
    setTimeout(handleReadyQuery, 1);
  }, []);

  const handleChange = (event, newValue, activeThumb) => {
    if (
      !Array.isArray(newValue) ||
      !Number.isInteger(newValue[0]) ||
      !Number.isInteger(newValue[1])
    ) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], max - minDistance);
        setValue([clamped, clamped + minDistance]);

        setItemQuery(name + '_min', clamped);
        setItemQuery(name + '_max', clamped + minDistance);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);

        setItemQuery(name + '_min', clamped - minDistance);
        setItemQuery(name + '_max', clamped);
      }
    } else {
      setValue(newValue);

      setItemQuery(name + '_min', newValue[0]);
      setItemQuery(name + '_max', newValue[1]);
    }
  };

  return (
    <>
      <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl
          sx={{ width: '7rem', display: 'inline-block' }}
          variant="outlined"
          size="small">
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">км</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            value={value[0]}
            onChange={(event) => handleChange(event, [parseInt(event.target.value), value[1]], 0)}
            inputProps={{
              'aria-label': 'км',
            }}
          />
          <FormHelperText id="outlined-weight-helper-text">Від</FormHelperText>
        </FormControl>

        <Typography sx={{ pb: 3 }}>-</Typography>
        <FormControl
          sx={{ width: '7rem', display: 'inline-block' }}
          variant="outlined"
          size="small">
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">км</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            value={value[1]}
            onChange={(event) => handleChange(event, [value[0], parseInt(event.target.value)], 1)}
            inputProps={{
              'aria-label': 'км',
            }}
          />
          <FormHelperText id="outlined-weight-helper-text">До</FormHelperText>
        </FormControl>
      </Box>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={min}
        max={max}
        step={step}
      />
    </>
  );
}
