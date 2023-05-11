import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/context';
import { ConfigContext } from './context/configContext';
import Loader from './components/Loader';

import { ThemeProvider } from '@mui/material/styles';
import useTheme from './hooks/theme.hook';

function App() {
  const { token, login, logout, userId, ready, isAuthenticated } = useAuth(); // bplaPassAdmin - password; admin123@gmail.com email
  const routes = useRoutes(isAuthenticated);
  const { themeDark, themeLight, modeView, setModeView } = useTheme();

  if (ready === false) {
    return <Loader />;
  }

  return (
    <ConfigContext.Provider value={{ modeView, setModeView }}>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          userId,
          isAuthenticated,
        }}>
        <ThemeProvider theme={modeView === 'light' ? themeLight : themeDark}>
          <Router>{routes}</Router>
        </ThemeProvider>
      </AuthContext.Provider>
    </ConfigContext.Provider>
  );
}

export default App;
