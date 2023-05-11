import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ImagesCarousel from '../components/ImagesCarousel';
import useBplaServer from '../hooks/bplaServer.hook';
import { Box, Container, Paper, createTheme } from '@mui/material';
import RadarChart from '../components/RadarChart';
import Loader from '../components/Loader';
import ListParameters from '../components/ListParameters';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Navbar';
import DetailInfoBlock from '../components/DetailInfoBlock';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      _800: 800,
    },
  },
});

const skipedListParams = [
  '_name',
  'model',
  'shortDescription',
  'description',
  'sourceUrl',
  'vendor',
];

export default function DetailPage() {
  const [data, setData] = useState(null);
  const [chartValues, setChartValues] = useState([]);
  const { getBplaId, isLoading } = useBplaServer();
  const bplaId = useParams().id;
  const wrapBreakpoint = theme.breakpoints.down('_800');

  async function getBpla() {
    setData(await getBplaId(bplaId));
  }

  useEffect(() => {
    getBpla();
  }, []);

  useEffect(() => {
    if (data) {
      setChartValues(BuildCartValues(data));
    }
  }, [data]);

  function BuildCartValues(baseData) {
    let values = [{ label: '', data: 0, enabled: true }];
    const whoIncluding = [
      { key: 'flightRange', label: 'Макс. Дальність польоту', enabled: true },
      { key: 'wingspan', label: 'Розмах крил', enabled: true },
      { key: 'maxFlyWeight', label: 'Злітна маса', enabled: true },
      { key: 'payloadWeight', label: 'Корисне навантаження', enabled: true },
      { key: 'maxSpeed', label: 'Максимальна швидкіть', enabled: true },
      { key: 'cruiseSpeed', label: 'Крейсерна швидкіть', enabled: true },
      { key: 'maxFlyHeight', label: 'Макс. висота польоту', enabled: true },
      { key: 'heightOfUse', label: 'Операційна висота', enabled: true },
      { key: 'flyDuration', label: 'Тривалість польоту', enabled: true },
    ];

    values = [];
    for (let parameter of whoIncluding) {
      if (baseData[parameter.key]) {
        values.push({
          label: parameter.label,
          data: baseData[parameter.key],
          enabled: parameter.enabled,
        });
      }
    }

    return values;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar displaySearch={false} />
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Paper sx={{ minHeight: 'calc(100vh - 5rem)', mt: '4.5rem' }}>
          {!isLoading && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  [wrapBreakpoint]: {
                    flexWrap: 'wrap',
                  },
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <ImagesCarousel images={data.photos} elevation={0} displayNavText={false} />
                <DetailInfoBlock
                  name={data._name}
                  model={data.model}
                  shortDescription={data.shortDescription}
                  description={data.description}
                  sourceUrl={data.sourceUrl}
                  vendor={data.vendor}
                />
              </Box>
              <ListParameters datas={data} skipParameters={skipedListParams} />

              {chartValues.length !== 0 && <RadarChart init={chartValues} />}
            </>
          )}
        </Paper>
      </Container>
    </>
  );
}
