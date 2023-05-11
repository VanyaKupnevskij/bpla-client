import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import ListCards from '../components/ListCards';
import Filters from '../components/Filters';
import { useState } from 'react';
import Sort from '../components/Sort';
import Paginator from '../components/Paginator';
import Navbar from '../components/Navbar';
import { Container, Paper } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import useQueryBuilder from '../hooks/queryBuilder.hook';

export default function MainPage() {
  const [openFilters, setOpenFilters] = useState(false);
  const [countTotal, setCountTotal] = useState(0);
  const { QueryProvider } = useQueryBuilder();

  const handleClickFilters = () => {
    setOpenFilters((prev) => (prev = !prev));
  };

  const handleClickClose = () => {
    setOpenFilters(false);
  };

  const handleCountTotal = (count) => {
    setCountTotal(count);
  };

  return (
    <QueryProvider>
      <Navbar />
      <Container maxWidth="xl">
        <CssBaseline />
        <Paper sx={{ minHeight: 'calc(100vh - 5rem)', mt: '4.5rem' }}>
          <Box sx={{ display: 'flex', p: 3, gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleClickFilters}
              sx={{
                px: 3,
                flexGrow: { xs: 1, sm: 0 },
                display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' },
              }}>
              Фільтри
            </Button>
            <Box sx={{ width: { xs: 'auto', sm: 240 }, ml: 'auto', flexGrow: { xs: 1, sm: 0 } }}>
              <Sort />
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Filters isDrawer={openFilters} handleClickClose={handleClickClose} />
            <Box component="main" sx={{ flexGrow: 1, flexShrink: 2, px: 3, pt: 0 }}>
              <ListCards
                onCountTotal={handleCountTotal}
                sx={{
                  overflow: 'auto',
                  height: 'calc(100vh - 14.5rem)',
                }}
              />
              <Paginator countTotal={countTotal} />
            </Box>
          </Box>
        </Paper>
      </Container>
    </QueryProvider>
  );
}
