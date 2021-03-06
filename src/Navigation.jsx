import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  navbar: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    padding: '1.25rem 1.25rem',
    position: 'relative',
  },
  navbarBrand: {
    color: 'rgb(51, 94, 234)',
    fontSize: '1.25rem',
    textDecoration: 'none',
  },
});

const Navigation = () => {
  const classes = useStyles();

  return (
    <div className={classes.navbar}>
      <span className={classes.navbarBrand}>Trade Bot</span>
    </div>
  );
};

export default Navigation;
