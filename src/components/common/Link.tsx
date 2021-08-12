import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { GatsbyLinkProps, Link as DefaultLink } from 'gatsby';
import React, { forwardRef } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

// eslint-disable-next-line @typescript-eslint/ban-types
interface LinkProps extends Omit<GatsbyLinkProps<{}>, 'ref'> {}

// eslint-disable-next-line react/display-name
const Link: React.FC<LinkProps> = forwardRef(({ className, to, ...props }) => {
  const classes = useStyles();

  return (
    <DefaultLink className={clsx(classes.root, className)} to={to} {...props} />
  );
});

export default Link;
