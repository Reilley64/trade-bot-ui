import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link, NavLink } from 'react-router-dom';

const useStyles = createUseStyles({
  navbar: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    padding: '1.25rem 1.25rem',
    position: 'relative',
  },
  navbarBrand: {
    color: 'rgb(51, 94, 234)',
    fontSize: '1.25rem',
    position: 'absolute',
    textDecoration: 'none',
  },
  navbarNav: {
    display: 'flex',
    flexDirection: 'row',
    listStyle: 'none',
    margin: '0 auto',
    paddingLeft: '0',
    zIndex: '900',
  },
  navbarNavLink: {
    color: 'inherit',
    display: 'block',
    padding: '0 1.5rem',
    textDecoration: 'none',
    '&:hover': {
      color: 'rgb(51, 94, 234)',
    },
    '&.active': {
      color: 'rgb(51, 94, 234)',
    },
  },
});

const Navigation = () => {
  const classes = useStyles();

  return (
    <div className={classes.navbar}>
      <Link className={classes.navbarBrand} to={'/'}>Trade Bot</Link>
      <ul className={classes.navbarNav}>
        <li>
          <NavLink className={classes.navbarNavLink} to={'/orders'}>Orders</NavLink>
        </li>
        <li>
          <NavLink className={classes.navbarNavLink} to={'/transactions'}>Transactions</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
