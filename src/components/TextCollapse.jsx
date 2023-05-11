import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function TextCollapse({ text, maxLength }) {
  const [expanded, setExpanded] = useState(false);
  const [innerText, setInnerText] = useState(text.substring(0, maxLength));

  const titleButton = expanded ? 'скрити' : 'детальніше';
  const maxHeight = expanded ? '500vh' : maxLength * 0.4;
  const speedHidden = 0.8; // seconds

  function reformatedText() {
    if (text.length <= maxLength) return;

    if (!expanded) {
      setTimeout(() => setInnerText(text.substring(0, maxLength) + '...'), 1000 * speedHidden);
    } else {
      setInnerText(text);
    }
  }

  useEffect(() => {
    reformatedText();
  }, [expanded]);

  function handleExpandClick() {
    setExpanded((prev) => !prev);
  }

  return (
    <Box>
      <Typography
        sx={{
          overflow: 'hidden',
          transition: `all ${speedHidden}s`,
          maxHeight: maxHeight,
        }}>
        {innerText}
      </Typography>

      {text.length > maxLength && (
        <Button size="small" onClick={handleExpandClick}>
          {titleButton}
        </Button>
      )}
    </Box>
  );
}
