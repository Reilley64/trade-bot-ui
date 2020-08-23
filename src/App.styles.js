import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  app: ({ theme }) => ({
    backgroundColor: theme.palette.background.main,
    color: theme.palette.text.base,
    fontFamily: '-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Oxygen,Ubuntu,\'Fira Sans\',\'Droid Sans\',\'Helvetica Neue\',sans-serif',
    fontSize: '1rem',
    fontWeight: 400,
    minHeight: '100vh',
    '& *': {
      outline: 'none !important',
      '&:disabled': {
        cursor: 'not-allowed',
      },
    },
    '& h1': {
      fontSize: '2.5em',
    },
    '& h2': {
      fontSize: '2em',
    },
    '& h3': {
      fontSize: '1.75em',
    },
    '& h4': {
      fontSize: '1.5em',
    },
    '& h5': {
      fontSize: '1.25em',
    },
    '& h6': {
      fontSize: '1em',
    },
    '& h1, h2, h3, h4, h5, h6': {
      fontWeight: '500',
      '&:last-child': {
        marginBottom: '0',
      },
    },
    '& h1, h2, h3, h4, h5, h6, p': {
      marginTop: '0',
      marginBottom: '.5rem',
      '&:last-child': {
        marginBottom: '0',
      },
    },
    '& small': {
      color: theme.palette.text.muted,
      fontSize: '.75em',
      fontWeight: '400',
    },
    '& .navlink': {
      padding: '.5rem 0',
      position: 'relative',
      display: 'block',
      color: theme.palette.text.muted,
      transition: 'color 250ms ease-in-out',
      '&.active': {
        color: theme.palette.primary.main,
      },
      '&:hover': {
        color: theme.palette.primary.light,
      },
    },
    '& .pull-up': {
      transition: 'box-shadow 300ms cubic-bezier(.4, 0, .2, 1)',
      '&:hover': {
        boxShadow: '0 3px 3px -2px rgba(0, 0, 0, .2), 0 3px 4px 0 rgba(0, 0, 0, .14), 0 1px 8px 0 rgba(0, 0, 0, .12)',
      },
    },
  }),
});

export default useStyles;
