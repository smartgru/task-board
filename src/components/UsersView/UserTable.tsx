import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import { User } from '../../support/api/models';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import { BackendEndpoint } from '../../support/api/api-schema';
import { useApiMutation, useApiQuery } from '../../support/api/hooks';
import Avatar from '../Avatar';
import UserModal from './UserModal';
import GlobalLoader from '../GlobalLoader';

interface IProps {
  users: User[];
  query: string;
  onChangeQuery: (value: string) => void;
  onRefresh: () => Promise<User[]>;
}

const applyPagination = (users: User[], page: number, limit: number) => {
  if (!users) return [];

  return users.slice(page * limit, page * limit + limit);
};

const UserTable: React.FC<IProps> = ({ users, onChangeQuery, onRefresh }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { data: tasks, loading: loadingTasks } = useApiQuery(
    BackendEndpoint.GetTasks,
    { props: {} },
  );
  const [deleteUser] = useApiMutation(BackendEndpoint.DeleteUser);
  const [UpdateTask] = useApiMutation(BackendEndpoint.UpdateTask);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setSearchQuery(e.target.value);
    onChangeQuery(e.target.value);
  };

  const paginatedUsers = useMemo(
    () => applyPagination(users, page, limit),
    [users, page, limit],
  );

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value));
  };

  const handleOpenEditModal = (user: User) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (user: User) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const unassignTasksForDeletedUser = async (userId: string) => {
    if (!tasks?.length) return;
    await Promise.all(
      tasks
        .filter((task) => task.assignedUsers?.[0].id === userId)
        .map((task) => {
          return UpdateTask({ id: task.id, assignedUsers: [] });
        }),
    );
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setLoadingDelete(true);
    await deleteUser({ id: selectedUser.id });
    setOpenDeleteModal(false);
    await unassignTasksForDeletedUser(selectedUser.id);
    await onRefresh();
    setLoadingDelete(false);
  };

  return (
    <>
      <Card>
        <Box p={2}>
          <TextField
            sx={{
              m: 0,
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Search by Name or Username"
            onChange={handleQueryChange}
            value={searchQuery}
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Box>
        <Divider />
        {paginatedUsers.length === 0 ? (
          <>
            <Typography
              sx={{ py: 10 }}
              variant="h6"
              fontWeight="normal"
              color="text.secondary"
              align="center"
            >
              We couldn't find any users matching your search criteria
            </Typography>
          </>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Profile Rank</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Typography>{user.username}</Typography>
                      </TableCell>
                      <TableCell>
                        <Stack
                          flexDirection="row"
                          alignItems="center"
                          columnGap={1}
                        >
                          <Avatar user={user} />
                          <Typography>
                            {user.firstName} {user.lastName}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">{user.profileRank}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleOpenEditModal(user)}>
                          Edit
                        </Button>
                        <Button onClick={() => handleOpenDeleteModal(user)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box p={2}>
              <TablePagination
                component="div"
                count={users.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Box>
          </>
        )}
      </Card>
      {Boolean(openEditModal && selectedUser) && (
        <UserModal
          editMode
          user={selectedUser}
          onDelete={handleDelete}
          loadingDelete={loadingDelete}
          onClose={() => setOpenEditModal(false)}
          onRefresh={onRefresh}
        />
      )}
      {Boolean(openDeleteModal && selectedUser) && (
        <DeleteConfirmDialog
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
      {(loadingTasks || loadingDelete) && <GlobalLoader />}
    </>
  );
};

export default UserTable;
