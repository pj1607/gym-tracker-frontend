// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  keyframes,
  useTheme
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ForgotPasswordModal from '../../Modal/ForgotPasswordModal.jsx';




// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    e.preventDefault(); // Prevents page reload
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    
  };
console.log(formData);
  const handleLogin = () => {
   sessionStorage.setItem("isLogin",true)
   navigate('/dashboard')
  };
  console.log(formData);

  return (
     <Box>
      {/* Login */}
      <Paper
        elevation={8}
        sx={{
          p: 4,
          backgroundColor: '#1e1e1e',
          borderRadius: 3,
          color: 'white',
          animation: `${fadeIn} 0.4s ease-out`,
        }}
      >
        <Typography variant="h5" mb={3} align="center" fontWeight="bold">
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: '#aaa' } }}
            sx={{
              input: { backgroundColor: '#2c2c2c' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#444' },
              },
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              style: { color: 'white' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: 'white' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: '#aaa' } }}
            sx={{
              input: { backgroundColor: '#2c2c2c' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#444' },
              },
            }}
          />
           <Button                 type="submit"
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
                                  Sign In
                                </Button>
        </form>

        <Button
          onClick={() => setModalOpen(true)}
          sx={{
            mt: 2,
            textTransform: 'none',
            color: '#1976d2',
            fontSize: '14px',
            display: 'block',
            mx: 'auto',
          }}
        >
          Forgot Password?
        </Button>

        <ForgotPasswordModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </Paper></Box>
  );
};

export default Login;
