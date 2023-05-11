import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { getCheckboxes } from './ListCheckboxesChart';

let data = {
  labels: [],
  datasets: [
    {
      label: 'Значення',
      data: [],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)',
    },
  ],
};

let settings = {
  scales: {
    r: {
      //   type: 'logarithmic',
      ticks: {
        stepSize: 200,
        font: {
          size: 14,
        },
      },
    },
  },
};

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function RadarChart({ init }) {
  const [initValues, setInitValues] = useState(init);
  const [values, setValues] = useState(data);
  const [options, setOptions] = useState(settings);

  useEffect(() => {
    if (initValues) {
      data.labels = [];
      data.datasets[0].data = [];

      for (let val of initValues) {
        if (val.enabled) {
          data.labels.push(val.label);
          data.datasets[0].data.push(val.data);
        }
      }

      let max = 0;
      for (let num of data.datasets[0].data) {
        if (max < num) {
          max = num;
        }
      }
      settings.scales.r.ticks.stepSize = Math.round(max / 4 / 10) * 10;

      setOptions({ ...settings });
      setValues({ ...data });
    }
  }, [initValues]);

  return (
    <>
      <Typography variant="h4" width="100%" textAlign="center" m="2rem 0">
        Графічне забраження числових даних
      </Typography>
      <Box
        display="flex"
        width="100%"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="center">
        {values.labels.length !== 0 && (
          <Radar
            options={options}
            redraw={true}
            data={values}
            style={{ maxWidth: '30rem', maxHeight: '31rem' }}
          />
        )}
        {getCheckboxes(initValues, setInitValues)}
      </Box>
    </>
  );
}
