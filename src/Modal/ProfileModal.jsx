import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from "./ForgotPasswordModal.jsx"

const ProfileModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  // Dummy values
  const [name, setName] = useState('Pranjal');
  const [email, setEmail] = useState('pranjal@example.com');
   const [modalOpen, setModalOpen] = useState(false);
  

  // Edit mode states
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);

  // Refs for input focusing
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  // Autofocus when edit mode is enabled
  useEffect(() => {
    if (isNameEditable && nameRef.current) {
      nameRef.current.focus();
    }
  }, [isNameEditable]);

  useEffect(() => {
    if (isEmailEditable && emailRef.current) {
      emailRef.current.focus();
    }
  }, [isEmailEditable]);

  const handleSave = () => {
    alert('Changes saved!');
    setIsNameEditable(false);
    setIsEmailEditable(false);
    handleClose();
  };

  const handleForgotPassword = () => {
    handleClose();
    navigate('/forgot-password');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#1a1a1a',
          color: '#fff',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
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
            '&:hover': {
              color: '#f44336',
              transform: 'scale(1.1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" textAlign="center" mb={3}>
          Profile Settings
        </Typography>

        {/* Name Field */}
        <TextField
          fullWidth
          label="Name"
          value={name}
          inputRef={nameRef}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            readOnly: !isNameEditable,
            style: {
              color: '#fff',
              cursor: isNameEditable ? 'text' : 'default',
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setIsNameEditable(true)}
                  sx={{ color: '#f44336' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ style: { color: '#ccc' } }}
          sx={{ mb: 2 }}
        />

        {/* Email Field */}
        <TextField
          fullWidth
          label="Email"
          value={email}
          inputRef={emailRef}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            readOnly: !isEmailEditable,
            style: {
              color: '#fff',
              cursor: isEmailEditable ? 'text' : 'default',
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setIsEmailEditable(true)}
                  sx={{ color: '#f44336' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ style: { color: '#ccc' } }}
          sx={{ mb: 3 }}
        />
         <Button                fullWidth
                                 onClick={handleSave}
                                  variant="contained"
                                  size="large"
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
                                   Save Changes
                                </Button> 

        <Button
          fullWidth
          variant="outlined"
          onClick={() => setModalOpen(true)}
          sx={{
            borderColor: '#f44336',
            color: '#f44336',
            '&:hover': {
              backgroundColor: '#2a2a2a',
            },
          }}
        >
          Forgot Password?
        </Button>
        <ForgotPasswordModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </Box>
    </Modal>
  );
};

export default ProfileModal;
