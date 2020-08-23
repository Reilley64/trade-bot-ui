import React from 'react';
import { useTheme } from 'reilleykit';

import Pagination from '../Pagination/Pagination';

const Table = ({
  api, columns, data, dataKey,
}) => {
  const theme = useTheme();

  const access = (dat, accessor) => {
    let final = dat;
    const split = accessor.split('.');

    for (const spli of split) {
      final = final[spli];
    }

    return final;
  };

  return (
    <>
      <table
        style={{
          tableLayout: 'fixed',
          borderCollapse: 'collapse',
          width: '100%',
        }}
      >
        <thead style={{ borderBottom: '.125rem solid', borderColor: theme.palette.border.main }}>
        <tr>
          {columns.map((column) => (
            <th
              key={column.accessor}
              style={{
                padding: '.25rem .5rem',
                border: 'medium none',
                color: theme.palette.text.muted,
                boxSizing: 'border-box',
                fontSize: '.75rem',
                fontWeight: '600',
                position: 'relative',
                textAlign: 'left',
                verticalAlign: 'top',
                ...column.headerStyle || {},
              }}
            >
              {column.header ? column.header : null}
            </th>
          ))}
        </tr>
        </thead>
        <tbody
          style={{
            borderBottom: '.125rem solid',
            borderColor: theme.palette.border.main,
            verticalAlign: 'top',
          }}
        >
        {data.length === 0
        && <tr>
          <td
            colSpan={columns.length}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              border: 'medium none',
              padding: '4px 8px',
              textAlign: 'left',
              verticalAlign: 'middle',
            }}
          >
            Nothing to see here
          </td>
        </tr>
        }
        {data.map((dat, rowIndex) => (
          <tr key={dat[dataKey]}>
            {columns.map((column) => (
              <td
                key={column.accessor}
                style={
                  column.cellStyle
                  || {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    border: 'medium none',
                    padding: '4px 8px',
                    textAlign: 'left',
                    verticalAlign: 'middle',
                  }}
              >
                {column.Cell
                  ? column.Cell({
                    rowIndex,
                    value: column.accessor
                      ? access(dat, column.accessor)
                      : null,
                    values: dat,
                  })
                  : access(dat, column.accessor)
                }
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      {api && <Pagination api={api} style={{ marginTop: '1rem' }}/>}
    </>
  );
};

export default Table;
