import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  button: ({ theme }) => ({
    alignItems: 'baseline',
    borderWidth: '0',
    color: theme.palette.text.base,
    display: 'inline-flex',
    fontWeight: '500',
    textAlign: 'center',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    backgroundColor: 'transparent',
    borderRadius: '3px',
    cursor: 'pointer',
    height: '2.3rem',
    lineHeight: '2.3rem',
    padding: '0 .5rem',
    transition: 'background .1s ease-out, box-shadow .15s cubic-bezier(.47, .03, .49, 1.38)',
    '&:hover': {
      backgroundColor: theme.palette.interact.main,
    },
    '&:disabled': {
      backgroundColor: 'transparent',
      color: theme.palette.text.muted,
    },
    '&.active': {
      backgroundColor: theme.palette.primary.main,
    },
    '& > span': {
      alignSelf: 'center',
      display: 'inline-flex',
      flexWrap: 'nowrap',
      position: 'relative',
      '& > span': {
        alignSelf: 'center',
        flex: '1 1 auto',
        margin: '0 4px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    '&.side': {
      padding: '0 4px',
      '& > span': {
        '& > span': {
          margin: '0',
        },
      },
    },
  }),
});

export default useStyles;
