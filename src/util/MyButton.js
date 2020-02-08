import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const MyButton = ({
  children,
  tip,
  onClick,
  placement,
  btnClassName,
  tipClassName
}) => (
  <Tooltip title={tip} placement={placement} className={tipClassName}>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);

MyButton.default = {
  placement: 'bottom'
};

export default MyButton;
