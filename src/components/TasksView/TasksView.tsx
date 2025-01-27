import React, { useState } from 'react';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import startCase from 'lodash/startCase';

import { useApiQuery } from '../../support/api/hooks';
import { BackendEndpoint } from '../../support/api/api-schema';
import { TaskStatus, User } from '../../support/api/models';
import GlobalLoader from '../GlobalLoader';
import TaskCard from './TaskCard';
import UserFilter from './UserFilter';
import './TasksView.css';
import TaskModal from './TaskModal';

export const TasksView: React.FC = () => {
  const {
    data: tasks,
    refetch,
    loading: loadingTasks,
  } = useApiQuery(BackendEndpoint.GetTasks, { props: {} });
  const { data: users, loading: loadingUsers } = useApiQuery(
    BackendEndpoint.GetUsers,
    { props: {} },
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const renderTasks = (status: TaskStatus) =>
    tasks
      ?.filter(
        (task) =>
          task.status === status &&
          (!selectedUser ||
            task.assignedUsers?.some((user) => user.id === selectedUser.id)),
      )
      .map((task) => (
        <TaskCard key={task.id} task={task} onRefresh={refetch} />
      ));

  return (
    <>
      <div className="task-view-container">
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{ textTransform: 'none' }}
            onClick={() => setOpenCreateModal(true)}
          >
            Create
          </Button>
          <UserFilter
            users={users}
            selectedUser={selectedUser}
            onSelect={setSelectedUser}
          />
        </Stack>
        <div className="tasks-view">
          {Object.values(TaskStatus).map((status) => (
            <Stack
              key={status}
              rowGap={2}
              sx={{
                flex: 1,
                p: 1,
                minWidth: 240,
                borderRadius: 1,
                bgcolor: '#f0f0f0',
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                  {startCase(status.toLowerCase())}
                </Typography>
                <Avatar
                  sx={{ width: 24, height: 24, bgcolor: 'secondary.main' }}
                >
                  <Typography sx={{ fontSize: 14 }}>
                    {tasks?.filter((task) => task.status === status).length}
                  </Typography>
                </Avatar>
              </Stack>
              {renderTasks(status)}
            </Stack>
          ))}
        </div>
      </div>
      {(loadingTasks || loadingUsers) && <GlobalLoader />}
      {openCreateModal && (
        <TaskModal
          onClose={() => setOpenCreateModal(false)}
          onRefresh={refetch}
        />
      )}
    </>
  );
};
