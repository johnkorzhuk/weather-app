import Link from '@/components/common/Link';
import Logo from '@/components/common/Logo';
import MuiDrawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import React from 'react';
import DrawerNavList from './DrawerNavList';

const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerRootPaper: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(4),
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
    width: theme.spacing(11) + 1,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
}));

interface NavDrawerProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const NavDrawer: React.FC<NavDrawerProps> = ({
  children,
  open,
  onClose,
  onOpen,
}) => {
  const classes = useStyles();

  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const Drawer = isXsDown ? SwipeableDrawer : MuiDrawer;

  return (
    <div className={classes.root}>
      <Drawer
        open={open}
        onMouseEnter={() => !isXsDown && onOpen()}
        onMouseLeave={() => !isXsDown && onClose()}
        onClose={onClose}
        onOpen={onOpen}
        variant={isXsDown ? 'temporary' : 'permanent'}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !isXsDown && !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerRootPaper]: true,
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !isXsDown && !open,
          }),
        }}
      >
        <div className={classes.logoContainer}>
          {isXsDown ? (
            <Logo />
          ) : (
            <Link to="/">
              <Logo />
            </Link>
          )}
        </div>

        <DrawerNavList open={open} />
      </Drawer>
      {children}
    </div>
  );
};

export default NavDrawer;
