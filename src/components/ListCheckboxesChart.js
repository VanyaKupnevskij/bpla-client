import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export function getCheckboxes(values, setter) {
  if (!values) return;

  const handleChange = (event, index) => {
    values[index].enabled = event.target.checked;
    setter([...values]);
  };

  return (
    <FormGroup sx={{ minWidth: '15rem', mx: 2 }}>
      {values.map((value, index) => {
        return (
          <FormControlLabel
            key={value.label}
            control={<Checkbox />}
            label={value.label}
            checked={value.enabled}
            onChange={(event) => handleChange(event, index)}
          />
        );
      })}
    </FormGroup>
  );
}
