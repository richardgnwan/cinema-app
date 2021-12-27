import React, { useState, useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import AdminDrawerList from './AdminDrawerList'
import AdminAppbarToolbar from './AdminAppbarToolbar';
import { LinearProgress, Stack } from '@mui/material';

const drawerWidth = 270;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    backgroundColor: 'white',
    minHeight: '100vh',
    "::-moz-selection": {
      color: 'white',
      background: '#42a5f5',
    },
    "::selection ": {
      color: 'white',
      background: '#42a5f5',
    },
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function AdminLayout(props) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  const { sx, children } = props;
  const { isLoading } = props;
  const { title = 'CN21 Admin' } = props;
  // const { activeIndex } = props

  const [open, setOpen] = useState(true);
  
  useEffect(() => {
    setOpen(upMd)
  }, [upMd])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ ...sx, display: 'flex' }}>
      <AppBar position="fixed" open={open} color="primary">
        <AdminAppbarToolbar title={title} open={open} handleDrawerOpen={handleDrawerOpen}/>
        { isLoading ? (
          <LinearProgress color="secondary" />
        ) : null }
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        // onMouseLeave={() => setOpen(false)}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <AdminDrawerList setOpenDrawer={setOpen} />

      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <Stack spacing={2}> */}
          { children }
        {/* </Stack> */}
      </Main>
    </Box>
  );
}