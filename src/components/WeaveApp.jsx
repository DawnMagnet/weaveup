import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppBar, Toolbar, Typography, Container, Paper, Grid,
  TextField, Button, Select, MenuItem, FormControl, InputLabel,
  Box, Accordion, AccordionSummary, AccordionDetails,
  Alert, Snackbar, IconButton, Tooltip
} from '@mui/material';
import {
  ExpandMore, Home, GetApp, Publish, Palette, Build, Settings
} from '@mui/icons-material';
import WeaveCanvas from './WeaveCanvas';
import LanguageSelector from './LanguageSelector';

const WeaveApp = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    treadleCount: 4,
    shaftCount: 4,
    chartWidth: 40,
    chartHeight: 40,
    tieupLocation: 'right-up',
    mode: 'to',
    threadAction: 'up',
    selectedColor: '#666666'
  });

  const [weaveState, setWeaveState] = useState({
    shaft: [],
    tieup: [],
    treadle: [],
    chart: [],
    warpColors: [],
    weftColors: []
  });

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
  const fileInputRef = useRef(null);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const initializeWeave = () => {
    const { treadleCount, shaftCount, chartWidth, chartHeight } = settings;
    setWeaveState({
      shaft: Array(shaftCount * chartWidth).fill(false),
      tieup: Array(shaftCount * treadleCount).fill(false),
      treadle: Array(chartHeight * treadleCount).fill(false),
      chart: Array(chartHeight * chartWidth).fill(false),
      warpColors: Array(chartWidth).fill('transparent'),
      weftColors: Array(chartHeight).fill('transparent')
    });
    showAlert(t('setting.button.init') + ' ' + t('explain.content.init.desc'), 'success');
  };

  const exportState = () => {
    const exportData = {
      settings,
      weaveState,
      timestamp: new Date().toISOString(),
      version: '2.0'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `weave-draft-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showAlert(t('setting.button.export') + ' completed', 'success');
  };

  const importState = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);
        if (importData.settings && importData.weaveState) {
          setSettings(importData.settings);
          setWeaveState(importData.weaveState);
          showAlert(t('setting.button.import') + ' completed', 'success');
        } else {
          showAlert('Invalid file format', 'error');
        }
      } catch (error) {
        showAlert('Error reading file: ' + error.message, 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const showAlert = (message, severity = 'info') => {
    setAlert({ open: true, message, severity });
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    initializeWeave();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" href="http://riko122.blog.fc2.com/">
            <Home />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            {t('title')}
          </Typography>
          <LanguageSelector />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Accordion sx={{ mb: 3 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>{t('explain.open')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ pl: 2 }}>
              <Typography variant="h6" gutterBottom>{t('explain.content.init.term')}</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>{t('explain.content.init.desc')}</Typography>

              <Typography variant="h6" gutterBottom>{t('explain.content.toChart.term')}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>1. {t('explain.content.toChart.desc1')}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>2. {t('explain.content.toChart.desc2')}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>3. {t('explain.content.toChart.desc3')}</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>4. {t('explain.content.toChart.desc4')}</Typography>

              <Typography variant="h6" gutterBottom>{t('explain.content.fromChart.term')}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>1. {t('explain.content.fromChart.desc1')}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>2. {t('explain.content.fromChart.desc2')}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>3. {t('explain.content.fromChart.desc3')}</Typography>
              <Typography variant="body2">{t('explain.content.fromChart.desc4')}</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <TextField
                    label={t('setting.treadle')}
                    type="number"
                    size="small"
                    value={settings.treadleCount}
                    onChange={(e) => handleSettingChange('treadleCount', parseInt(e.target.value))}
                    inputProps={{ min: 1, max: 20 }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label={t('setting.shaft')}
                    type="number"
                    size="small"
                    value={settings.shaftCount}
                    onChange={(e) => handleSettingChange('shaftCount', parseInt(e.target.value))}
                    inputProps={{ min: 1, max: 20 }}
                  />
                </Grid>
                <Grid item>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>{t('setting.tieUp.name')}</InputLabel>
                    <Select
                      value={settings.tieupLocation}
                      onChange={(e) => handleSettingChange('tieupLocation', e.target.value)}
                    >
                      <MenuItem value="right-up">{t('setting.tieUp.location.rightUp')}</MenuItem>
                      <MenuItem value="right-down">{t('setting.tieUp.location.rightDown')}</MenuItem>
                      <MenuItem value="left-up">{t('setting.tieUp.location.leftUp')}</MenuItem>
                      <MenuItem value="left-down">{t('setting.tieUp.location.leftDown')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    label={t('setting.chart.width')}
                    type="number"
                    size="small"
                    value={settings.chartWidth}
                    onChange={(e) => handleSettingChange('chartWidth', parseInt(e.target.value))}
                    inputProps={{ min: 1, max: 100 }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label={t('setting.chart.height')}
                    type="number"
                    size="small"
                    value={settings.chartHeight}
                    onChange={(e) => handleSettingChange('chartHeight', parseInt(e.target.value))}
                    inputProps={{ min: 1, max: 100 }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<Settings />}
                  onClick={initializeWeave}
                >
                  {t('setting.button.init')}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GetApp />}
                  onClick={exportState}
                >
                  {t('setting.button.export')}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Publish />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {t('setting.button.import')}
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".json"
                  style={{ display: 'none' }}
                  onChange={importState}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <WeaveCanvas
          settings={settings}
          weaveState={weaveState}
          onWeaveStateChange={setWeaveState}
          onSettingChange={handleSettingChange}
          onAlert={showAlert}
        />
      </Container>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeAlert} severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>

      <Box sx={{ textAlign: 'center', py: 3, mt: 5, bgcolor: '#f5f5f5' }}>
        <Typography variant="body2" color="text.secondary">
          © 2019-2024 <a href="http://riko122.blog.fc2.com/">{t('home')}</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default WeaveApp;
