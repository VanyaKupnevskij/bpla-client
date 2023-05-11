import * as React from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import noPhoto from '../images/noPhoto.jpg';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function renderImagesList(images, activeStep) {
  return images.map((image, index) => (
    <Box key={index} sx={{ overflow: 'hidden' }}>
      {Math.abs(activeStep - index) <= 2 ? (
        <Box
          component="img"
          sx={{
            height: 255,
            display: 'block',
            overflow: 'hidden',
            width: '100%',
            objectFit: 'contain',
          }}
          src={image}
          alt="previewPhoto"
        />
      ) : null}
    </Box>
  ));
}

function ImagesCarousel({ images = [], elevation = 4, displayNavText = true }) {
  images = images.length === 0 ? [noPhoto] : images;

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Paper
      square
      elevation={elevation}
      sx={{
        width: '90rem',
        maxWidth: '40rem',
        minWidth: { sm: '17rem', md: '22rem' },
        flexGrow: 1,
        p: 1,
        mx: 2,
        borderRadius: 1,
      }}>
      <AutoPlaySwipeableViews index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
        {renderImagesList(images, activeStep)}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            {displayNavText && 'Наступне'}
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            {displayNavText && 'Попереднє'}
          </Button>
        }
      />
    </Paper>
  );
}

export default ImagesCarousel;
