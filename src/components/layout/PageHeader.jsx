import React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import UserProfileMenu from '../auth/UserProfileMenu';
import BreadcrumbsNav from '../ui/BreadcrumbsNav';

const PageHeader = ({ title, breadcrumbsItems, currentPage }) => {
  return (
    <>
      <AppBar 
        position="static" 
        color="transparent" 
        elevation={0}
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          mb: 3
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <BreadcrumbsNav
              items={breadcrumbsItems}
              currentPage={currentPage}
            />
          </Box>
          <UserProfileMenu />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default PageHeader;
