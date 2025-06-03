import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Paper, Box, Button, FormControl, InputLabel, Select, MenuItem,
  Grid, Typography, Divider
} from '@mui/material';
import { Build, Palette, Transform } from '@mui/icons-material';

const WeaveCanvas = ({ settings, weaveState, onWeaveStateChange, onSettingChange, onAlert }) => {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const rectSize = 20;
  const colorGap = 10; // Gap between color sections and main chart

  const setupCanvas = (canvas, ctx) => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set actual size in memory (scaled to account for extra pixel density)
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;

    // Scale the drawing context so everything draws at the correct size
    ctx.scale(devicePixelRatio, devicePixelRatio);

    // Disable image smoothing for crisp pixel art
    ctx.imageSmoothingEnabled = false;
  };

  const drawGrid = (ctx, x, y, cols, rows, data, sectionType) => {
    // Save context state
    ctx.save();

    // Set line properties for crisp lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#333333';
    ctx.lineCap = 'square';
    ctx.lineJoin = 'miter';

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Use Math.floor to ensure integer pixel positions
        const rectX = Math.floor(x + col * rectSize) + 0.5;
        const rectY = Math.floor(y + row * rectSize) + 0.5;
        const index = row * cols + col;

        // Fill based on data first
        if (data && index < data.length && data[index]) {
          if (typeof data[index] === 'boolean') {
            ctx.fillStyle = data[index] ? '#000000' : 'transparent';
          } else {
            ctx.fillStyle = data[index];
          }
          if (ctx.fillStyle !== 'transparent') {
            ctx.fillRect(rectX - 0.5, rectY - 0.5, rectSize, rectSize);
          }
        }

        // Draw rectangle border
        ctx.beginPath();
        ctx.rect(rectX - 0.5, rectY - 0.5, rectSize, rectSize);
        ctx.stroke();
      }
    }

    // Restore context state
    ctx.restore();
  };

  const drawWeavePattern = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Setup canvas for crisp rendering
    setupCanvas(canvas, ctx);

    const { chartWidth, chartHeight, shaftCount, treadleCount, tieupLocation } = settings;

    // Calculate layout based on tie-up location with color gaps
    let warpX = 0, warpY = 0;
    let shaftX = 0, shaftY = 0;
    let tieupX = 0, tieupY = 0;
    let chartX = 0, chartY = 0;
    let treadleX = 0, treadleY = 0;
    let weftX = 0, weftY = 0;

    switch (tieupLocation) {
      case 'right-up':
        warpX = 0; warpY = 0;
        shaftX = 0; shaftY = rectSize + colorGap;
        tieupX = chartWidth * rectSize + rectSize; tieupY = rectSize + colorGap;
        chartX = 0; chartY = rectSize + shaftCount * rectSize + rectSize + colorGap;
        treadleX = chartWidth * rectSize + rectSize; treadleY = rectSize + shaftCount * rectSize + rectSize + colorGap;
        weftX = chartWidth * rectSize + rectSize + treadleCount * rectSize + colorGap; weftY = rectSize + shaftCount * rectSize + rectSize + colorGap;
        break;
      //
    }

    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

    // Draw sections with proper dimensions
    drawGrid(ctx, warpX, warpY, chartWidth, 1, weaveState.warpColors, 'warp');
    drawGrid(ctx, shaftX, shaftY, chartWidth, shaftCount, weaveState.shaft, 'shaft');
    drawGrid(ctx, tieupX, tieupY, treadleCount, shaftCount, weaveState.tieup, 'tieup');
    drawGrid(ctx, chartX, chartY, chartWidth, chartHeight, weaveState.chart, 'chart');
    drawGrid(ctx, treadleX, treadleY, treadleCount, chartHeight, weaveState.treadle, 'treadle');
    drawGrid(ctx, weftX, weftY, 1, chartHeight, weaveState.weftColors, 'weft');

    // Add labels with better text rendering
    ctx.save();
    ctx.fillStyle = '#000000';
    ctx.font = '12px Arial';
    ctx.textBaseline = 'middle';
    ctx.fillText(t('content.warpColor'), Math.floor(warpX) + 8, Math.floor(warpY) + 10);
    ctx.fillText(t('content.weftColor'), Math.floor(weftX) + 8, Math.floor(weftY) + 10);
    ctx.restore();
  };

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const { chartWidth, chartHeight, shaftCount, treadleCount, tieupLocation } = settings;

    // Calculate layout positions with color gaps (same as in drawWeavePattern)
    let warpX = 0, warpY = 0;
    let shaftX = 0, shaftY = 0;
    let tieupX = 0, tieupY = 0;
    let chartX = 0, chartY = 0;
    let treadleX = 0, treadleY = 0;
    let weftX = 0, weftY = 0;

    switch (tieupLocation) {
      case 'right-up':
        warpX = 0; warpY = 0;
        shaftX = 0; shaftY = rectSize + colorGap;
        tieupX = chartWidth * rectSize + rectSize; tieupY = rectSize + colorGap;
        chartX = 0; chartY = rectSize + shaftCount * rectSize + rectSize + colorGap;
        treadleX = chartWidth * rectSize + rectSize; treadleY = rectSize + shaftCount * rectSize + rectSize + colorGap;
        weftX = chartWidth * rectSize + rectSize + treadleCount * rectSize + colorGap; weftY = rectSize + shaftCount * rectSize + rectSize + colorGap;
        break;
    }

    // Check which section was clicked
    const col = Math.floor((x - shaftX) / rectSize);
    const row = Math.floor((y - shaftY) / rectSize);

    // Warp colors
    if (x >= warpX && x < warpX + chartWidth * rectSize &&
        y >= warpY && y < warpY + rectSize) {
      const warpCol = Math.floor((x - warpX) / rectSize);
      const index = warpCol;

      if (index < weaveState.warpColors.length) {
        const newWarpColors = [...weaveState.warpColors];
        newWarpColors[index] = newWarpColors[index] === settings.selectedColor ? null : settings.selectedColor;
        onWeaveStateChange(prev => ({ ...prev, warpColors: newWarpColors }));
      }
    }

    // Shaft threading
    else if (x >= shaftX && x < shaftX + chartWidth * rectSize &&
             y >= shaftY && y < shaftY + shaftCount * rectSize) {
      const shaftCol = Math.floor((x - shaftX) / rectSize);
      const shaftRow = Math.floor((y - shaftY) / rectSize);
      const index = shaftRow * chartWidth + shaftCol;

      if (index < weaveState.shaft.length) {
        const newShaft = [...weaveState.shaft];
        newShaft[index] = !newShaft[index];
        onWeaveStateChange(prev => ({ ...prev, shaft: newShaft }));
      }
    }

    // Tie-up
    else if (x >= tieupX && x < tieupX + treadleCount * rectSize &&
             y >= tieupY && y < tieupY + shaftCount * rectSize) {
      const tieupCol = Math.floor((x - tieupX) / rectSize);
      const tieupRow = Math.floor((y - tieupY) / rectSize);
      const index = tieupRow * treadleCount + tieupCol;

      if (index < weaveState.tieup.length) {
        const newTieup = [...weaveState.tieup];
        newTieup[index] = !newTieup[index];
        onWeaveStateChange(prev => ({ ...prev, tieup: newTieup }));
      }
    }

    // Chart
    else if (x >= chartX && x < chartX + chartWidth * rectSize &&
             y >= chartY && y < chartY + chartHeight * rectSize) {
      const chartCol = Math.floor((x - chartX) / rectSize);
      const chartRow = Math.floor((y - chartY) / rectSize);
      const index = chartRow * chartWidth + chartCol;

      if (index < weaveState.chart.length) {
        const newChart = [...weaveState.chart];
        newChart[index] = !newChart[index];
        onWeaveStateChange(prev => ({ ...prev, chart: newChart }));
      }
    }

    // Treadle
    else if (x >= treadleX && x < treadleX + treadleCount * rectSize &&
             y >= treadleY && y < treadleY + chartHeight * rectSize) {
      const treadleCol = Math.floor((x - treadleX) / rectSize);
      const treadleRow = Math.floor((y - treadleY) / rectSize);
      const index = treadleRow * treadleCount + treadleCol;

      if (index < weaveState.treadle.length) {
        const newTreadle = [...weaveState.treadle];
        newTreadle[index] = !newTreadle[index];
        onWeaveStateChange(prev => ({ ...prev, treadle: newTreadle }));
      }
    }

    // Weft colors
    else if (x >= weftX && x < weftX + rectSize &&
             y >= weftY && y < weftY + chartHeight * rectSize) {
      const weftRow = Math.floor((y - weftY) / rectSize);

      if (weftRow < weaveState.weftColors.length) {
        const newWeftColors = [...weaveState.weftColors];
        newWeftColors[weftRow] = newWeftColors[weftRow] === settings.selectedColor ? null : settings.selectedColor;
        onWeaveStateChange(prev => ({ ...prev, weftColors: newWeftColors }));
      }
    }
  };

  const generateDraft = () => {
    const { chartWidth, chartHeight, shaftCount, treadleCount } = settings;
    const newChart = new Array(chartWidth * chartHeight).fill(false);

    // Generate draft pattern based on shaft threading and treadle tie-up
    for (let row = 0; row < chartHeight; row++) {
      for (let col = 0; col < chartWidth; col++) {
        const chartIndex = row * chartWidth + col;
        let isRaised = false;

        // Check which shaft this warp thread is on
        for (let shaft = 0; shaft < shaftCount; shaft++) {
          const shaftIndex = shaft * chartWidth + col;
          if (weaveState.shaft[shaftIndex]) {
            // Check which treadles are pressed for this pick
            for (let treadle = 0; treadle < treadleCount; treadle++) {
              const treadleIndex = row * treadleCount + treadle;
              const tieupIndex = shaft * treadleCount + treadle;

              if (weaveState.treadle[treadleIndex] && weaveState.tieup[tieupIndex]) {
                isRaised = settings.threadAction === 'up';
                break;
              }
            }
          }
        }

        newChart[chartIndex] = isRaised;
      }
    }

    onWeaveStateChange(prev => ({ ...prev, chart: newChart }));
    onAlert(t('setting.button.chart.drowdown') + ' generated', 'success');
  };

  const generateColorChart = () => {
    const { chartWidth, chartHeight } = settings;
    const newChart = new Array(chartWidth * chartHeight).fill(null);

    // Generate colored draft based on current pattern and colors
    for (let row = 0; row < chartHeight; row++) {
      for (let col = 0; col < chartWidth; col++) {
        const chartIndex = row * chartWidth + col;
        const isWarpUp = weaveState.chart[chartIndex];

        // If warp is up, show warp color; if down, show weft color
        if (isWarpUp) {
          newChart[chartIndex] = weaveState.warpColors[col] || settings.selectedColor;
        } else {
          newChart[chartIndex] = weaveState.weftColors[row] || '#FFFFFF';
        }
      }
    }

    onWeaveStateChange(prev => ({ ...prev, chart: newChart }));
    onAlert(t('setting.button.chart.color') + ' generated', 'success');
  };

  const generateFromDraft = () => {
    const { chartWidth, chartHeight, shaftCount, treadleCount } = settings;

    // Analyze the draft pattern to determine threading and treadling
    const newShaft = new Array(shaftCount * chartWidth).fill(false);
    const newTreadle = new Array(chartHeight * treadleCount).fill(false);
    const newTieup = new Array(shaftCount * treadleCount).fill(false);

    // Step 1: Analyze each warp thread's pattern to determine shaft assignment
    const warpPatterns = [];
    for (let col = 0; col < chartWidth; col++) {
      const pattern = [];
      for (let row = 0; row < chartHeight; row++) {
        const chartIndex = row * chartWidth + col;
        pattern.push(weaveState.chart[chartIndex]);
      }
      warpPatterns.push(pattern);
    }

    // Group similar patterns and assign to shafts
    const shaftAssignments = new Array(chartWidth).fill(-1);
    let usedShafts = 0;

    for (let col = 0; col < chartWidth; col++) {
      if (shaftAssignments[col] !== -1) continue;

      // Find the best available shaft for this pattern
      let assignedShaft = usedShafts % shaftCount;

      // Assign this warp to the shaft
      shaftAssignments[col] = assignedShaft;
      const shaftIndex = assignedShaft * chartWidth + col;
      newShaft[shaftIndex] = true;

      // Look for other warps with the same pattern and assign them to the same shaft
      for (let otherCol = col + 1; otherCol < chartWidth; otherCol++) {
        if (shaftAssignments[otherCol] === -1) {
          let samePattern = true;
          for (let row = 0; row < chartHeight; row++) {
            if (warpPatterns[col][row] !== warpPatterns[otherCol][row]) {
              samePattern = false;
              break;
            }
          }
          if (samePattern) {
            shaftAssignments[otherCol] = assignedShaft;
            const otherShaftIndex = assignedShaft * chartWidth + otherCol;
            newShaft[otherShaftIndex] = true;
          }
        }
      }

      if (usedShafts < shaftCount - 1) usedShafts++;
    }

    // Step 2: Analyze each pick to determine treadling
    const pickPatterns = [];
    for (let row = 0; row < chartHeight; row++) {
      const pattern = [];
      for (let col = 0; col < chartWidth; col++) {
        const chartIndex = row * chartWidth + col;
        pattern.push(weaveState.chart[chartIndex]);
      }
      pickPatterns.push(pattern);
    }

    // Group similar pick patterns and assign to treadles
    const treadleAssignments = new Array(chartHeight).fill(-1);
    let usedTreadles = 0;

    for (let row = 0; row < chartHeight; row++) {
      if (treadleAssignments[row] !== -1) continue;

      let assignedTreadle = usedTreadles % treadleCount;
      treadleAssignments[row] = assignedTreadle;
      const treadleIndex = row * treadleCount + assignedTreadle;
      newTreadle[treadleIndex] = true;

      // Look for other picks with the same pattern
      for (let otherRow = row + 1; otherRow < chartHeight; otherRow++) {
        if (treadleAssignments[otherRow] === -1) {
          let samePattern = true;
          for (let col = 0; col < chartWidth; col++) {
            if (pickPatterns[row][col] !== pickPatterns[otherRow][col]) {
              samePattern = false;
              break;
            }
          }
          if (samePattern) {
            treadleAssignments[otherRow] = assignedTreadle;
            const otherTreadleIndex = otherRow * treadleCount + assignedTreadle;
            newTreadle[otherTreadleIndex] = true;
          }
        }
      }

      if (usedTreadles < treadleCount - 1) usedTreadles++;
    }

    // Step 3: Generate tie-up based on the relationship between shafts and treadles
    for (let row = 0; row < chartHeight; row++) {
      const treadleUsed = treadleAssignments[row];
      if (treadleUsed === -1) continue;

      for (let col = 0; col < chartWidth; col++) {
        const shaftUsed = shaftAssignments[col];
        if (shaftUsed === -1) continue;

        const chartIndex = row * chartWidth + col;
        const isRaised = weaveState.chart[chartIndex];

        // If this combination should raise the thread, connect shaft to treadle
        if (isRaised === (settings.threadAction === 'up')) {
          const tieupIndex = shaftUsed * treadleCount + treadleUsed;
          newTieup[tieupIndex] = true;
        }
      }
    }

    onWeaveStateChange(prev => ({
      ...prev,
      shaft: newShaft,
      treadle: newTreadle,
      tieup: newTieup
    }));
    onAlert(t('setting.button.chart.threadAndTreadle') + ' generated', 'success');
  };

  useEffect(() => {
    const newWidth = Math.max(800, settings.chartWidth * rectSize + settings.treadleCount * rectSize + 200 + colorGap);
    const newHeight = Math.max(600, settings.chartHeight * rectSize + settings.shaftCount * rectSize + 100 + colorGap);
    setCanvasSize({ width: newWidth, height: newHeight });
  }, [settings]);

  useEffect(() => {
    drawWeavePattern();
  }, [settings, weaveState, canvasSize]);

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <FormControl size="small">
              <InputLabel>{t('setting.toOrFrom.to')}</InputLabel>
              <Select
                value={settings.mode}
                onChange={(e) => onSettingChange('mode', e.target.value)}
              >
                <MenuItem value="to">{t('setting.toOrFrom.to')}</MenuItem>
                <MenuItem value="from">{t('setting.toOrFrom.from')}</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel>{t('setting.upOrDown.name')}</InputLabel>
              <Select
                value={settings.threadAction}
                onChange={(e) => onSettingChange('threadAction', e.target.value)}
              >
                <MenuItem value="up">{t('setting.upOrDown.select.up')}</MenuItem>
                <MenuItem value="down">{t('setting.upOrDown.select.down')}</MenuItem>
              </Select>
            </FormControl>

            {settings.mode === 'to' && (
              <>
                <Button
                  variant="contained"
                  startIcon={<Build />}
                  onClick={generateDraft}
                >
                  {t('setting.button.chart.drowdown')}
                </Button>
                <input
                  type="color"
                  value={settings.selectedColor}
                  onChange={(e) => onSettingChange('selectedColor', e.target.value)}
                  style={{ width: 40, height: 40, border: 'none', borderRadius: 4 }}
                />
                <Button
                  variant="contained"
                  startIcon={<Palette />}
                  onClick={generateColorChart}
                >
                  {t('setting.button.chart.color')}
                </Button>
              </>
            )}

            {settings.mode === 'from' && (
              <Button
                variant="contained"
                startIcon={<Transform />}
                onClick={generateFromDraft}
              >
                {t('setting.button.chart.threadAndTreadle')}
              </Button>
            )}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ border: '1px solid #ccc', borderRadius: 1, overflow: 'auto' }}>
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              onClick={handleCanvasClick}
              style={{
                cursor: 'pointer',
                display: 'block',
                width: canvasSize.width,
                height: canvasSize.height,
                imageRendering: 'pixelated'
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WeaveCanvas;
