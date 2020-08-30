import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import { useTheme } from 'reilleykit';

import useStyles from './Table.styles';

import { resolveProperty } from '../../common';

const Table = ({
  columns, data, dataKey, sortBy,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [sortByState, setSortByState] = useState(sortBy);

  return (
    <>
      <table className={classes.table}>
        <thead className={classes.tableHead}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className={classes.tableHeader}
                onClick={() => setSortByState({ field: column.accessor, desc: sortByState.field === column.accessor ? !sortByState.desc : false })}
                style={column.headerStyle}
              >
                {column.header ? column.header : null}
                {column.accessor === sortByState.field
                && (
                <>
                  {' '}
                  {sortByState.desc ? <ChevronDown /> : <ChevronUp />}
                </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={classes.tableBody}>
          {data.length === 0
          && (
          <tr>
            <td className={classes.tableData} colSpan={columns.length}>
              Nothing to see here
            </td>
          </tr>
          )}
          {data.sort((a, b) => {
            if (resolveProperty(a, sortByState.field) < resolveProperty(b, sortByState.field)) return sortByState.desc ? 1 : -1;
            if (resolveProperty(a, sortByState.field) > resolveProperty(b, sortByState.field)) return sortByState.desc ? -1 : 1;
            return 0;
          }).map((datum, rowIndex) => (
            <tr key={datum[dataKey]}>
              {columns.map((column) => (
                <td key={column.accessor} className={classes.tableData} style={column.cellStyle}>
                  {column.Cell
                    ? column.Cell({
                      rowIndex,
                      value: column.accessor
                        ? resolveProperty(datum, column.accessor)
                        : null,
                      values: datum,
                    })
                    : resolveProperty(datum, column.accessor)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
