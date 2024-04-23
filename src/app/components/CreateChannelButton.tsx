'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Add } from '@mui/icons-material';
import { useFormState } from 'react-dom';
import { handleCreateChannel } from '../lib/actions';
import { Box } from '@mui/material';

export default function CreateChannelButton() {
  const [open, setOpen] = React.useState(false);
  const [state, action] = useFormState(handleCreateChannel, undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button color="primary" onClick={handleClickOpen} size="large" aria-label="add" sx={{
        width: '100%',
        marginY: '0.25rem',
        height: '3rem',
      }}
      startIcon={<Add />}>
        New Conversation
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            action(formData);
            if (state === 'success') {
              handleClose();
            }
          },
        }}
      >
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the email address of the account to start a new conversation with.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            autoComplete='off'
          />
          {typeof state === 'string' && <p>{state}</p>}
          {typeof state === 'object' && state.errors && <p>{state.errors.email}</p>}
          {typeof state === 'object' && state.message && <p>{state.message}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{marginX: '0.75rem', padding: '0.5rem'}}>Cancel</Button>
          <Button type="submit" startIcon={<Add />} sx={{padding: '0.5rem'}}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}