import { AppBar, Switch, Toolbar, Typography } from '@mui/material';
import React from 'react';

interface Props {
  darkMode: boolean;
  switchDarkMode: (dark: boolean) => void;
}

const Header: React.FC<Props> = ({ darkMode, switchDarkMode }) => {
  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    switchDarkMode(event.target.checked);
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">RE-STORE</Typography>
        <Switch color="default" checked={darkMode} onChange={handleSwitch} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
