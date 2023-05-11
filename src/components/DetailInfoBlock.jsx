import { Box, Chip, Paper, Tooltip, Typography, Zoom } from '@mui/material';
import TextCollapse from './TextCollapse';

export default function DetailInfoBlock({
  name = 'Назва БпЛА',
  model,
  shortDescription,
  description,
  sourceUrl,
  vendor,
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        minWidth: '15rem',
        flexGrow: 1,
        m: '0.5rem 1rem 1rem 1rem',
        p: 2,
      }}>
      <Typography variant="h5" fontWeight={600}>
        {name} {model && `(модель: ${model})`}
      </Typography>

      <Typography variant="body2" color="gray" sx={{ my: 2 }}>
        {shortDescription}
      </Typography>

      {vendor && (
        <Typography variant="body2">
          Виробник: <b>{vendor}</b>
        </Typography>
      )}

      <Typography variant="h6" mt={2}>
        Опис
      </Typography>
      <TextCollapse text={description} maxLength={200} />

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        {sourceUrl && (
          <Tooltip
            title={sourceUrl}
            arrow
            TransitionComponent={Zoom}
            enterDelay={50}
            leaveDelay={200}>
            <Chip
              label="Посилання на ресурс"
              target="_blank"
              color="primary"
              variant="outlined"
              component="a"
              href={sourceUrl}
              clickable
            />
          </Tooltip>
        )}
      </Box>
    </Paper>
  );
}
