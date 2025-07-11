import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
      width: { xs: '80%', sm: '450px', md: '600px' }, 
     p: { xs: 2, sm: 3, md: 4 }, 
  bgcolor: '#1e1e1e',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  color: 'white',
};

const ForgotPasswordModal = ({ open, onClose }) => {
  const [step, setStep] = useState(1); // 1 = email, 2 = otp
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleNext = () => {
    if (!email) return alert('Please enter email');
    // You can trigger OTP API here
    setStep(2);
  };

  const handleSubmit = () => {
    if (!otp) return alert('Please enter OTP');
    console.log('Reset request submitted:', { email, otp });
    // Handle submit logic here
    onClose();
  };

  const handleClose = () => {
    setStep(1);
    setEmail('');
    setOtp('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
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
        <Typography variant="h6" mb={2}>
          Forgot Password
        </Typography>

        
        

        {step === 1 && (
          <>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                input: { color: 'white', backgroundColor: '#2c2c2c' },
                label: { color: '#aaa' },
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#444' },
                },
              }}
              InputLabelProps={{ style: { color: '#aaa' } }}
            />
              <Button
                        
                        onClick = {handleNext}
                        fullWidth
                        variant="contained"
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
                        Send OTP
                      </Button>
          </>
        )}

        {step === 2 && (
          <>
            <TextField
              fullWidth
              label="Enter OTP"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{
                input: { color: 'white', backgroundColor: '#2c2c2c' },
                label: { color: '#aaa' },
                mt: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#444' },
                },
              }}
              InputLabelProps={{ style: { color: '#aaa' } }}
            />
              <Button
                        onClick = {handleSubmit}
                        variant="contained"
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
                        Submit
                      </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ForgotPasswordModal;
