import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid2 as Grid,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { User } from '../../support/api/models';
import { BackendEndpoint } from '../../support/api/api-schema';
import { useApiMutation } from '../../support/api/hooks';

interface IProps {
  user?: User;
  editMode?: boolean;
  loadingDelete?: boolean;
  onClose: () => void;
  onDelete?: () => Promise<void>;
  onRefresh?: () => Promise<User[]>;
}

const emptyUser: User = {
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  profileRank: 0,
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  profileRank: yup
    .number()
    .min(0, 'Profile rank must be greater than or equal to 0')
    .integer('Profile rank must be an integer')
    .required('Profile rank is required'),
});

const UserModal: React.FC<IProps> = ({
  user: selectedUser,
  editMode,
  loadingDelete,
  onClose,
  onDelete,
  onRefresh,
}) => {
  const [createUser] = useApiMutation(BackendEndpoint.CreateUser);
  const [updateUser] = useApiMutation(BackendEndpoint.UpdateUser);

  const handleDelete = async () => {
    await onDelete?.();
    onClose();
  };

  const handleSave = async (user: User) => {
    if (editMode) {
      await updateUser(user);
    } else {
      await createUser(user);
    }
    await onRefresh?.();
    onClose();
  };

  const { values, touched, errors, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: selectedUser ?? emptyUser,
      validationSchema: validationSchema,
      onSubmit: handleSave,
    });

  const isCTADisabled = isSubmitting || loadingDelete;

  return (
    <>
      <Dialog open onClose={onClose}>
        <DialogTitle>{editMode ? selectedUser?.id : 'New User'}</DialogTitle>
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
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Profile Rank"
                  name="profileRank"
                  type="number"
                  value={values.profileRank}
                  onChange={handleChange}
                  error={Boolean(touched.profileRank && errors.profileRank)}
                  helperText={touched.profileRank && errors.profileRank}
                />
              </Grid>
            </Grid>
            <Stack
              direction="row"
              justifyContent="flex-end"
              sx={{ mt: 2 }}
              spacing={2}
            >
              {editMode && (
                <Button
                  size="large"
                  variant="outlined"
                  color="error"
                  disabled={isCTADisabled}
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
    </>
  );
};

export default UserModal;
