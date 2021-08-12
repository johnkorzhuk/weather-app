import Link from '@/components/common/Link';
import { SvgIconTypeMap } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from '@reach/router';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  listItemContainer: {
    borderRadius: 32,
    marginTop: theme.spacing(2),
  },
  listItemRoot: {
    width: 'auto',
    flex: 'auto',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    paddingLeft: 3,
  },
  listItemRootExpanded: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  listItemText: {
    fontSize: '2.1rem',
    fontWeight: 'bold',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(3),
  },
  listItemClosed: {
    visibility: 'hidden',
  },
}));

interface DrawerNavItemProps {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  route: string;
  expanded: boolean;
}

const DrawerNavItem: React.FC<DrawerNavItemProps> = ({
  label,
  icon: Icon,
  route,
  expanded,
}) => {
  const classes = useStyles();
  const location = useLocation();
  let pathname = location.pathname;

  if (pathname.length > 1) {
    pathname = pathname.replace(/\/$/, '');
  }

  const isMatch = pathname === route;

  return (
    <ListItem
      button
      selected={isMatch}
      className={classes.listItemContainer}
      classes={{
        root: classes.listItemRoot,
      }}
    >
      <Link to={route}>
        <div className={classes.container}>
          <ListItemIcon className={classes.icon}>
            <Icon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            className={clsx({
              [classes.listItemClosed]: !expanded,
            })}
            primary={label}
            classes={{
              primary: classes.listItemText,
            }}
          />
        </div>
      </Link>
    </ListItem>
  );
};

export default DrawerNavItem;
