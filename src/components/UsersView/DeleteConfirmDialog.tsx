import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

interface IProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmDialog: React.FC<IProps> = ({ onClose, onConfirm }) => {
  return (
    <Dialog open>
      <DialogTitle>Are you sure want to delete this user?</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Removing this user will make their corresponding tasks unassigned.
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
