import Logo from '@/components/common/Logo';
import Nav from '@/components/Nav';
import GlobalProviders from '@/components/providers';
import { useMediaQuery } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  appContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 1400,
    width: '100%',
    padding: theme.spacing(3),
    paddingTop: theme.spacing(3),
    overflowX: 'hidden',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      width: '80%',
      padding: theme.spacing(4),
      paddingTop: theme.spacing(1),
    },
  },
}));

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const [drawerOpenState, setDrawerOpenState] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpenState(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpenState(false);
  };

  return (
    <>
      <GlobalProviders>
        <CssBaseline />

        <Nav
          open={drawerOpenState}
          onOpen={handleDrawerOpen}
          onClose={handleDrawerClose}
        >
          <main className={classes.appContainer}>
            {isXsDown && (
              <div
                onClick={handleDrawerOpen}
                role="button"
                aria-disabled="false"
              >
                <Logo />
              </div>
            )}
            {children}
          </main>
        </Nav>
      </GlobalProviders>
    </>
  );
};

export default Layout;
