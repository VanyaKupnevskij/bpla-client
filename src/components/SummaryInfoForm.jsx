import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MultipleSelect from './MultipleSelect';
import SelectInput from './SelectInput';
import NumberSlider from './NumberSlider';

import listParameters from '../context/listParameters';

import TextInput from './TextInput';

function RenderListOptions({ descriptions }) {
  return descriptions.map((item, index) => {
    switch (item.type) {
      case 'TextInput':
        return (
          <TextInput
            key={item.name}
            sm={index <= 1 ? 6 : 12}
            required={item.required}
            id={item.name}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
            multiline={item.isMultiline}
          />
        );

      case 'SelectInput':
        return (
          <SelectInput
            key={item.name}
            xs={12}
            title={item.title}
            name={item.name}
            label={item.label}
            variants={item.variants}
          />
        );

      case 'MultipleSelect':
        return (
          <MultipleSelect
            key={item.name}
            xs={12}
            title={item.title}
            name={item.name}
            label={item.label}
            variants={item.variants}
          />
        );

      case 'NumberSlider':
        return (
          <NumberSlider
            key={item.name}
            xs={12}
            title={item.title}
            IconComponent={item.icon}
            name={item.name}
            min={item.min}
            max={item.max}
            step={item.step}
            countMarkBase={item.countMarkBase}
          />
        );
    }
  });
}

export default function SummaryInfoForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Загальна інформація
      </Typography>
      <Grid container spacing={3}>
        <RenderListOptions descriptions={Object.values(listParameters)} />
      </Grid>
    </>
  );
}
