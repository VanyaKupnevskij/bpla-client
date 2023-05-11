import React, { useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import UploadImages from './UploadImages';

export default function PhotoForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Фото БПЛА
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UploadImages />
        </Grid>
      </Grid>
    </>
  );
}
