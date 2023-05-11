import { useContext, useEffect, useState } from 'react';
import BplaCard from './BplaCard';

import Grid from '@mui/material/Grid';
import useBplaServer from '../hooks/bplaServer.hook';
import { Typography } from '@mui/material';
import Loader from './Loader';
import { QueryContext } from '../context/queryContext';

export default function ListCards({ onCountTotal, sx }) {
  const [bplas, setBplas] = useState([]);
  const { getBplas, isLoading } = useBplaServer();
  const { query, onReady, isReady, onChange } = useContext(QueryContext);

  async function getListBpla() {
    if (!isReady.current) return;
    const { listBpla, countTotal } = await getBplas(query.current);
    onCountTotal(countTotal);
    setBplas(listBpla);
  }

  useEffect(() => {
    getListBpla();
    onChange.current = () => {};
    onReady.current = getListBpla;
  }, []);

  if (isLoading) {
    return <Loader sx={sx} />;
  }

  if (bplas.length === 0) {
    return (
      <Typography variant="h4" color="Highlight" textAlign="center" sx={sx}>
        За заданними параметрами не знайдено жодного БпЛА :(
      </Typography>
    );
  }

  return (
    <Grid container spacing={1} sx={sx} py={2}>
      {bplas.map((bpla) => (
        <Grid item xs={12} sm={6} md={6} lg={3} xl={4} key={bpla._id}>
          <BplaCard
            idBpla={bpla._id}
            title={bpla._name + ' ' + bpla.model}
            preview={bpla?.photos[0]}>
            {bpla.shortDescription}
          </BplaCard>
        </Grid>
      ))}
    </Grid>
  );
}
