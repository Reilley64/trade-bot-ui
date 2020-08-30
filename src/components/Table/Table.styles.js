import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  table: {
    tableLayout: 'fixed',
    borderCollapse: 'collapse',
    width: '100%',
  },
  tableHead: ({ theme }) => ({
    borderBottom: `.125rem solid ${theme.palette.border.main}`,
    borderColor: theme.palette.border.main,
    userSelect: 'none',
  }),
  tableBody: ({ theme }) => ({
    borderBottom: `.125rem solid ${theme.palette.border.main}`,
    verticalAlign: 'top',
  }),
  tableHeader: ({ theme }) => ({
    padding: '.25rem .5rem',
    border: 'medium none',
    color: theme.palette.text.muted,
    cursor: 'pointer',
    boxSizing: 'border-box',
    fontSize: '.75rem',
    fontWeight: '600',
    position: 'relative',
    textAlign: 'left',
    verticalAlign: 'top',
    '&:hover': {
      backgroundColor: 'rgb(245, 245, 245)',
    },
  }),
  tableData: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    border: 'medium none',
    padding: '4px 8px',
    textAlign: 'left',
    verticalAlign: 'middle',
  },
});

export default useStyles;
