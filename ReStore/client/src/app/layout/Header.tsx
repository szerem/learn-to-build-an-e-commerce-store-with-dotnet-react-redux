import { ShoppingCart } from '@mui/icons-material';
import {
  AppBar,
  Badge,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useStoreContext } from '../context/StoreContext';

interface Props {
  darkMode: boolean;
  switchDarkMode: (dark: boolean) => void;
}

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
  { title: 'checkout', path: '/checkout' },
];

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
];

// https://mui.com/customization/color/
const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500',
  },
  '&.active': {
    color: 'text.secondary',
  },
};

const Header: React.FC<Props> = ({ darkMode, switchDarkMode }) => {
  const { basket } = useStoreContext();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    switchDarkMode(event.target.checked);
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* 1 group left  
        https://mui.com/system/box/
         -> System props 
          -> https://mui.com/system/properties/
        */}
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            exact
            sx={navStyles}
          >
            RE-STORE
          </Typography>
          <Switch color="default" checked={darkMode} onChange={handleSwitch} />
        </Box>
        {/* 2 group mid */}
        <Box display="flex" alignItems="center">
          <List sx={{ display: 'flex' }}>
            {midLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
        {/* 3 group right  */}
        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            sx={{ color: 'inherits' }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: 'flex' }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
