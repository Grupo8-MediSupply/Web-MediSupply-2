import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  useTheme
} from '@mui/material';
import UserMenu from '../auth/UserMenu';

const drawerWidth = 240;

const MainAppBar = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
