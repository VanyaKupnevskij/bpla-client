import { Box, CircularProgress, Container } from '@mui/material';

export default function Loader({ sx }) {
  return (
    <Box sx={sx} pt={4}>
      <Container maxWidth="sm">
        <CircularProgress />
      </Container>
    </Box>
  );
}
