import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, clearError } from '../redux/features/authSlice';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../assets/logo_medisupply_principal.png';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  // Obtener la ruta a la que se quería acceder antes de redirigir al login
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
    
    // Limpiar errores anteriores
    dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
    
    // Limpiar errores cuando el usuario empieza a escribir
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!credentials.username) {
      errors.username = 'El nombre de usuario es obligatorio';
    }
    
    if (!credentials.password) {
      errors.password = 'La contraseña es obligatoria';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    dispatch(login(credentials));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box 
      sx={{
        height: '100vh',
        display: 'flex',
        backgroundColor: theme => theme.palette.background.default
      }}
    >
      {/* Contenedor principal */}
      <Box 
        sx={{ 
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2
        }}
      >
        <Paper 
          elevation={3} 
          sx={{
            display: 'flex',
            width: '100%',
            maxWidth: 1000,
            minHeight: 500,
            overflow: 'hidden',
            borderRadius: 2
          }}
        >
          {/* Formulario de login (lado izquierdo) */}
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{
              flex: { xs: '1', md: '1 1 50%' },
              display: 'flex',
              flexDirection: 'column',
              p: { xs: 3, sm: 4, md: 5 },
              justifyContent: 'center'
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              Login
            </Typography>
             
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <TextField 
              label="Usuario"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="ejemplo@medisupply.com"
              error={!!formErrors.username}
              helperText={formErrors.username}
              disabled={loading}
              autoComplete="username"
            />
            
            <TextField 
              label="Contraseña"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="***************"
              error={!!formErrors.password}
              helperText={formErrors.password}
              disabled={loading}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button 
              type="submit"
              variant="contained" 
              color="primary" 
              size="large"
              fullWidth
              disabled={loading}
              sx={{ 
                mt: 3, 
                py: 1.5,
                position: 'relative'
              }}
            >
              {loading ? (
                <CircularProgress 
                  size={24} 
                  sx={{
                    color: theme => theme.palette.primary.contrastText
                  }}
                />
              ) : 'Iniciar sesión'}
            </Button>
          </Box>
          
          {/* Logo y branding (lado derecho) */}
          <Box 
            sx={{
              flex: '1 1 50%',
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'background.paper',
              position: 'relative'
            }}
          >
            <Box 
              component="img" 
              src={logo} 
              alt="MediSupply Logo"
              sx={{
                width: '80%',
                maxWidth: 300,
                objectFit: 'contain'
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
