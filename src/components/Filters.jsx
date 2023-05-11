import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import BodyFilters from './BodyFilters';

export default function Filters({ isDrawer = false, isAside = true, handleClickClose }) {
  return (
    <>
      {isAside && (
        <Box
          sx={{
            overflowY: 'auto',
            overflowX: 'hidden',
            maxHeight: 'calc(100vh - 12rem)',
            minWidth: '20rem',
            width: '15%',
            flexGrow: 1,
            pl: 1,
            pr: 1,
            display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' },
          }}>
          <BodyFilters />
        </Box>
      )}
      {isDrawer && (
        <ClickAwayListener onClickAway={handleClickClose}>
          <Drawer
            variant="permanent"
            sx={{
              position: 'fixed',
              zIndex: '1500',
              width: 280,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: 280, boxSizing: 'border-box' },
            }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ ml: 'auto' }}
                onClick={handleClickClose}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <Box sx={{ overflowY: 'auto', overflowX: 'hidden', flexGrow: 1, p: 1 }}>
              <BodyFilters />
            </Box>
          </Drawer>
        </ClickAwayListener>
      )}
    </>
  );
}
