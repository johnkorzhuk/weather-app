import { makeStyles } from '@material-ui/core/styles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: '4rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '4.4rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '5rem',
    },
  },
}));

interface PrimaryHeadingProps extends TypographyProps {}

const PrimaryHeading: React.FC<PrimaryHeadingProps> = ({
  children,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Typography
      variant="h1"
      className={clsx(classes.heading, className)}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default PrimaryHeading;
