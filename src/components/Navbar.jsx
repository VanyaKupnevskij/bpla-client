import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Button, Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ModeSwitch from './ModeSwitch';
import FormGroup from '@mui/material/FormGroup';
import LogoutIcon from '@mui/icons-material/Logout';

import logoImage from '../images/logo.png';
import { AuthContext } from '../context/context';
import SearchInput from './SearchInput';

export default function Navbar({ displaySearch = true, displayLogout = false }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  function handleClickHome() {
    navigate('/');
  }

  function handleClickLogout() {
    logout();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar>
            <Box
              onClick={handleClickHome}
              sx={{ mr: '1rem', display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}>
              <img src={logoImage} alt="logo" style={{ height: '3rem' }} />
            </Box>
            <Typography
              onClick={handleClickHome}
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: '3rem', display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}>
              БПЛА
            </Typography>

            {displaySearch && <SearchInput />}

            <FormGroup
              sx={{
                pl: { xs: 2, sm: 3, md: 5 },
                ml: 'auto',
                display: { xs: 'none', sm: 'block' },
              }}>
              <ModeSwitch />
            </FormGroup>
            {displayLogout && (
              <Button
                onClick={handleClickLogout}
                color="secondary"
                type="button"
                sx={{ p: '10px', ml: '1.5rem' }}
                aria-label="search">
                <Typography variant="button">log out</Typography>
                <LogoutIcon sx={{ ml: '0.5rem' }} />
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
