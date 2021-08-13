import Grow from '@material-ui/core/Grow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useLocation } from '@reach/router';
import React from 'react';
import Link from '../common/Link';
import routes from './routes';

// @ts-ignore
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 0,
  },
  listItemContainer: {
    borderRadius: 32,
    marginTop: theme.spacing(2),
  },
  navItemContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.25),
  },
  iconRoot: {
    minWidth: 'auto',
  },
  routeName: {
    fontSize: '2.1rem',
    fontWeight: 'bold',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2.5),
  },
}));

interface DrawerNavItemProps {
  open: boolean;
}

const DrawerNavItem: React.FC<DrawerNavItemProps> = ({ open }) => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

  let pathname = location.pathname;

  if (pathname.length > 1) {
    pathname = pathname.replace(/\/$/, '');
  }

  return (
    <List className={classes.container}>
      {routes.map(({ id, route, label, icon: Icon }) => {
        const isMatch = pathname === route;

        return (
          <ListItem
            key={id}
            button
            selected={isMatch}
            className={classes.listItemContainer}
            color="primary"
          >
            <Link to={route}>
              <div className={classes.navItemContainer}>
                <ListItemIcon className={classes.iconRoot}>
                  <Icon fontSize="large" />
                </ListItemIcon>

                {isXsDown ? (
                  <ListItemText
                    primary={label}
                    classes={{
                      primary: classes.routeName,
                    }}
                  />
                ) : (
                  <Grow in={open}>
                    <ListItemText
                      primary={label}
                      classes={{
                        primary: classes.routeName,
                      }}
                    />
                  </Grow>
                )}
              </div>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};

export default DrawerNavItem;
