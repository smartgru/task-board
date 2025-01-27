import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Task, TaskPriority, TaskStatus } from '../../support/api/models';
import { useApiMutation, useApiQuery } from '../../support/api/hooks';
import { BackendEndpoint } from '../../support/api/api-schema';
import PriorityChip from '../PriorityChip';
import GlobalLoader from '../GlobalLoader';
import Avatar from '../Avatar';

interface IProps {
  task?: Task;
  editMode?: boolean;
  onClose: () => void;
  onRefresh?: () => Promise<Task[]>;
}

const emptyTask: Task = {
  id: '',
  title: '',
  description: '',
  priority: TaskPriority.Low,
  status: TaskStatus.ToDo,
};

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});

const TaskModal: React.FC<IProps> = ({
  task: selectedTask,
  editMode,
  onClose,
  onRefresh,
}) => {
  const { data: users, loading } = useApiQuery(BackendEndpoint.GetUsers, {
    props: {},
  });

  const [updateTask] = useApiMutation(BackendEndpoint.UpdateTask);
  const [createTask] = useApiMutation(BackendEndpoint.CreateTask);
  const [deleteTask] = useApiMutation(BackendEndpoint.DeleteTask);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async () => {
    setLoadingDelete(true);
    if (!selectedTask) return;
    await deleteTask({ id: selectedTask.id });
    await onRefresh?.();
    setLoadingDelete(false);
    onClose();
  };

  const handleSave = async (task: Task) => {
    if (editMode) {
      await updateTask(task);
    } else {
      await createTask(task);
    }
    await onRefresh?.();
    onClose();
  };

  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: selectedTask ?? emptyTask,
    validationSchema: validationSchema,
    onSubmit: handleSave,
  });

  const handleChangeAssign = (e: SelectChangeEvent<string>) => {
    const userId = e.target.value as string;
    const user = users?.find((user) => user.id === userId);
    setFieldValue('assignedUsers', [user]);
  };

  const isCTADisabled = isSubmitting || loadingDelete;

  return (
    <>
      <Dialog maxWidth="lg" open onClose={onClose}>
        <DialogTitle>{editMode ? selectedTask?.id : 'New Task'}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ pt: 0 }}>
          <Box component="form" sx={{ pt: 2 }} onSubmit={handleSubmit}>
            <Stack direction="row" columnGap={4} sx={{ pb: 2 }}>
              <Stack rowGap={2} sx={{ minWidth: 360 }}>
                <TextField
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Stack>
              <Divider variant="fullWidth" orientation="vertical" flexItem />
              <Stack rowGap={2}>
                <Stack direction="row" columnGap={2}>
                  <FormControl variant="filled" sx={{ minWidth: 144 }}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                    >
                      {Object.entries(TaskStatus).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Typography>{key}</Typography>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="filled" sx={{ minWidth: 144 }}>
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select
                      labelId="priority-label"
                      id="priority"
                      name="priority"
                      value={values.priority}
                      onChange={handleChange}
                    >
                      {Object.entries(TaskPriority).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <PriorityChip priority={value} />
                            <Typography>{key}</Typography>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <FormControl variant="filled">
                  <InputLabel id="assign-label">Assign</InputLabel>
                  <Select
                    labelId="assign-label"
                    id="assignedUsers"
                    name="assignedUsers"
                    value={
                      users?.find(
                        (user) => user.id === values.assignedUsers?.[0]?.id,
                      )?.id ?? ''
                    }
                    onChange={handleChangeAssign}
                  >
                    {users?.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Avatar user={user} />
                          <Typography>
                            {user.firstName} {user.lastName}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              {editMode && (
                <Button
                  size="large"
                  variant="outlined"
                  color="error"
                  disabled={isCTADisabled}
                  loading={loadingDelete}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              )}
              <Button
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={isCTADisabled}
              >
                Save
              </Button>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
      {loading && <GlobalLoader />}
    </>
  );
};

export default TaskModal;
