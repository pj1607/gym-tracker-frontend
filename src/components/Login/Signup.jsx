
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
   keyframes,
  useTheme,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
    const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

    console.log(formData);
    
  const handleSignup = (e) => {
     sessionStorage.setItem("isLogin",true)
   navigate('/dashboard')
  };

  return (
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
      <Typography variant="h5" fontWeight="bold" align="center" mb={3}>
        Register
      </Typography>

      <form onSubmit={handleSignup}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          sx={{
            input: { color: 'white', backgroundColor: '#2c2c2c' },
            label: { color: '#aaa' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#444' },
            },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          sx={{
            input: { color: 'white', backgroundColor: '#2c2c2c' },
            label: { color: '#aaa' },
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
          sx={{
            input: { color: 'white', backgroundColor: '#2c2c2c' },
            label: { color: '#aaa' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#444' },
            },
          }}
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
                                  Register
                                </Button>
      </form>
    </Paper>
  );
};

export default Signup;
