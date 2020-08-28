import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'reilleykit';

import useStyles from './Pagination.styles';

const Pagination = ({ api, className, ...props }) => {
  const theme = useTheme();

  const classes = useStyles({ theme });

  const [page, setPage] = useState(api.response.data.number);

  useEffect(() => {
    setPage(api.response.data.number);
  }, [api.response.data.number]);

  useEffect(() => {
    if (page !== api.response.data.number) api.fetch({ ...api.lastParams, page });
  }, [page]);

  if (api.response.data.totalElements / api.response.data.numberOfElements > 1) {
    return (
      <div className={clsx(classes.wrapper, className)} {...props}>
        <button
          className={clsx(classes.button, 'side')}
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          type="button"
        >
          <span>
            <span>
              <svg focusable="false" height="24" role="presentation" viewBox="0 0 24 24" width="24">
                <path
                  d="M9.005 10.995l4.593-4.593a.99.99 0 1 1 1.4 1.4l-3.9 3.9 3.9 3.9a.99.99 0 0 1-1.4 1.4L9.005 12.41a1 1 0 0 1 0-1.414z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </span>
          </span>
        </button>
        <button
          className={clsx(classes.button, { active: api.response.data.number === 0 })}
          onClick={() => setPage(0)}
          type="button"
        >
          <span>
            <span>
              1
            </span>
          </span>
        </button>
        {page < 3
        && (
        <>
          {Array.from(Array(4).keys()).map((button, index) => {
            if (index + 1 < api.response.data.totalPages - 1) {
              return (
                <button
                  className={clsx(classes.button, { active: page === index + 1 })}
                  onClick={() => setPage(index + 1)}
                  type="button"
                >
                  <span>
                    <span>
                      {index + 2}
                    </span>
                  </span>
                </button>
              );
            }
            return null;
          })}
          {api.response.data.totalPages > 4
          && (
          <button
            className={classes.button}
            disabled
            type="button"
          >
            <span>
              <span>
                ...
              </span>
            </span>
          </button>
          )}
        </>
        )}
        {(page >= 3 && (page <= api.response.data.totalPages - 4))
        && (
        <>
          <button
            className={classes.button}
            disabled
            type="button"
          >
            <span>
              <span>
                ...
              </span>
            </span>
          </button>
          <button
            className={classes.button}
            onClick={() => setPage(page - 1)}
            type="button"
          >
            <span>
              <span>
                {page}
              </span>
            </span>
          </button>
          <button
            className={clsx(classes.button, 'active')}
            onClick={() => setPage(page)}
            type="button"
          >
            <span>
              <span>
                {page + 1}
              </span>
            </span>
          </button>
          <button
            className={classes.button}
            onClick={() => setPage(page + 1)}
            type="button"
          >
            <span>
              <span>
                {page + 2}
              </span>
            </span>
          </button>
          <button
            className={classes.button}
            disabled
            type="button"
          >
            <span>
              <span>
                ...
              </span>
            </span>
          </button>
        </>
        )}
        {(api.response.data.totalPages > 4 && page > api.response.data.totalPages - 4)
        && (
        <>
          <button
            className={classes.button}
            disabled
            type="button"
          >
            <span>
              <span>
                ...
              </span>
            </span>
          </button>
          {Array.from(Array(4).keys()).map((button, index) => {
            if ((api.response.data.totalPages - 1 - (4 - index)) > 0) {
              return (
                <button
                  className={clsx(classes.button, { active: page === api.response.data.totalPages - 1 - (4 - index) })}
                  onClick={() => setPage(api.response.data.totalPages - 1 - (4 - index))}
                  type="button"
                >
                  <span>
                    <span>
                      {api.response.data.totalPages - (4 - index)}
                    </span>
                  </span>
                </button>
              );
            }
            return null;
          })}
        </>
        )}
        <button
          className={clsx(classes.button, { active: api.response.data.number === api.response.data.totalPages - 1 })}
          onClick={() => setPage(api.response.data.totalPages - 1)}
          type="button"
        >
          <span>
            <span>
              {api.response.data.totalPages}
            </span>
          </span>
        </button>
        <button
          className={clsx(classes.button, 'side')}
          disabled={page === api.response.data.totalPages - 1}
          onClick={() => setPage(page + 1)}
          type="button"
        >
          <span>
            <span>
              <svg focusable="false" height="24" role="presentation" viewBox="0 0 24 24" width="24">
                <path
                  d="M14.995 10.995a1 1 0 0 1 0 1.414l-4.593 4.593a.99.99 0 0 1-1.4-1.4l3.9-3.9-3.9-3.9a.99.99 0 0 1 1.4-1.4l4.593 4.593z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </span>
          </span>
        </button>
      </div>
    );
  }
  return null;
};

export default Pagination;
