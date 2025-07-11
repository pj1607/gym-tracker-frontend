import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

const AddMemberModal = ({ open, handleClose, onAdd }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const today = dayjs().format('DD-MM-YYYY');

  const handleSubmit = (e) => {
    e.preventDefault();
     const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) return;
    if (!/^\d{10}$/.test(trimmedPhone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    const newMember = {
      id: Date.now(),
      name,
      phone,
      status: 'Paid',
      lastPaidDate: today,
      unpaidFor: 0,
    };
    onAdd(newMember);
    setName('');
    setPhone('');
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
            position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '80%', sm: '450px', md: '600px' }, 
     p: { xs: 2, sm: 3, md: 4 }, 
    bgcolor: '#1a1a1a',
    boxShadow: 24,
    borderRadius: 2,
    color: '#fff',
    transition: 'all 0.3s ease-in-out',
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#fff',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.2)',
              color: '#f44336',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" mb={2} textAlign="center">
          Add New Member
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{ style: { color: '#fff' } }}
          />
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{ style: { color: '#fff' } }}
          />

          <TextField
            fullWidth
            label="Status"
            variant="outlined"
            value="Paid"
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{ readOnly: true,style: { color: '	#ccc' , cursor: 'default',caretColor: 'transparent', } }}
          />
          <TextField
            fullWidth
            label="Last Paid Date"
            variant="outlined"
            value={today}

            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{  readOnly: true,style: { color: '	#ccc' , cursor: 'default',caretColor: 'transparent', } }}
          />
          <TextField
            fullWidth
            label="Unpaid For (Months)"
            variant="outlined"
            value="0"
            sx={{ mb: 3 }}
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{  readOnly: true,style: { color: '	#ccc' , cursor: 'default',caretColor: 'transparent', } }}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              background: 'linear-gradient(45deg, #d32f2f, #b71c1c)',
              color: '#fff',
              fontWeight: 'bold',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                background: 'linear-gradient(45deg, #b71c1c, #7f0000)',
                transform: 'scale(1.03)',
              },
            }}
          >
            Add Member
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddMemberModal;
