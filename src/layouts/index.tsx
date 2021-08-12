import Nav from '@/components/Nav/index';
import GlobalProviders from '@/components/providers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  appContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 1400,
    width: '80%',
    padding: theme.spacing(4),
    paddingTop: theme.spacing(1),
  },
}));

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <GlobalProviders>
        <CssBaseline />
        <Nav>
          <main className={classes.appContainer}>{children}</main>
        </Nav>
      </GlobalProviders>
    </>
  );
};

export default Layout;
