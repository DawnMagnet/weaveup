import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import WeaveApp from './components/WeaveApp.jsx';

const theme = createTheme();

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WeaveApp />
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
