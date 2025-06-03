import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, Select, MenuItem, Box } from '@mui/material';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl size="small" fullWidth>
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="zh">中文</MenuItem>
          <MenuItem value="ja">日本語</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
