import React from 'react';
import CriticalIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import HighIcon from '@mui/icons-material/KeyboardArrowUp';
import MediumIcon from '@mui/icons-material/DragHandle';
import LowIcon from '@mui/icons-material/KeyboardArrowDown';
import NoneIcon from '@mui/icons-material/CircleOutlined';

import { TaskPriority } from '../../support/api/models';

interface IProps {
  priority: TaskPriority;
}

const PriorityChip: React.FC<IProps> = ({ priority }) => {
  const getIcon = () => {
    switch (priority) {
      case TaskPriority.Critical:
        return <CriticalIcon color="error" />;
      case TaskPriority.High:
        return <HighIcon color="error" />;
      case TaskPriority.Medium:
        return <MediumIcon color="primary" />;
      case TaskPriority.Low:
        return <LowIcon color="secondary" />;
      case TaskPriority.None:
        return <NoneIcon color="disabled" />;
    }
  };

  return <>{getIcon()}</>;
};

export default PriorityChip;
