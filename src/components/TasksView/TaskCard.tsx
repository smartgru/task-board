import React, { useState } from 'react';
import { Card, Stack, Typography } from '@mui/material';

import { Task } from '../../support/api/models';
import PriorityChip from '../PriorityChip';
import Avatar from '../Avatar';
import TaskModal from './TaskModal';

interface IProps {
  task: Task;
  onRefresh?: () => Promise<Task[]>;
}

const TaskCard: React.FC<IProps> = ({ task, onRefresh }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Card sx={{ p: 2, cursor: 'pointer' }} onClick={() => setOpenModal(true)}>
        <Typography sx={{ fontWeight: 'bold' }}>{task.id}</Typography>
        <Typography sx={{ py: 1 }}>{task.title}</Typography>
        <Stack direction="row" justifyContent="space-between">
          <PriorityChip priority={task.priority} />
          <Avatar user={task.assignedUsers?.[0]} />
        </Stack>
      </Card>
      {openModal && (
        <TaskModal
          editMode
          task={task}
          onRefresh={onRefresh}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default TaskCard;
