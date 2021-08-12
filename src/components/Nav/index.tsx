import Link from '@/components/common/Link';
import Logo from '@/components/common/Logo';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import DrawerNavItem from './DrawerNavItem';
import routes from './routes';

const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(15) + 1,
  },
  navContentContainer: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(4),
    minWidth: 120,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
}));

const NavDrawer = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.navContentContainer]: true,
          }),
        }}
      >
        <div className={classes.logoContainer}>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <List>
          {routes.map((route) => {
            return <DrawerNavItem key={route.id} {...route} expanded={open} />;
          })}
        </List>
      </Drawer>
      {children}
    </div>
  );
};

export default NavDrawer;
