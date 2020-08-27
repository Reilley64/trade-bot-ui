import clsx from 'clsx';
import React from 'react';

import useStyles from './CardBody.styles';

const CardBody = ({ children, className, ...props }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.body, className)} {...props}>
      {children}
    </div>
  );
};

export default CardBody;
