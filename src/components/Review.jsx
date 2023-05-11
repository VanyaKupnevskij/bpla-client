import React, { useContext, useEffect } from 'react';
import { FormContext } from '../context/formContext';
import ImagesCarousel from './ImagesCarousel';
import ListParameters from './ListParameters';

import Typography from '@mui/material/Typography';

export default function Review() {
  const { states } = useContext(FormContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Перевірте всю інформацію
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ImagesCarousel images={states.current.images} />
      </div>
      <ListParameters datas={states.current} />
    </>
  );
}
