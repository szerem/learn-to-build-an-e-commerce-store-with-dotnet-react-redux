import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Container, createTheme } from '@mui/material';
import { useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';

const App = () => {
  // console.log(`App ${new Date().toISOString()} ...`);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    },
  });

  const switchDarkMode = (dark: boolean) => {
    setDarkMode(dark);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} switchDarkMode={switchDarkMode} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
};

export default App;
