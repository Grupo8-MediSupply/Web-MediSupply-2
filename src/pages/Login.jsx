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
  IconButton,
  Grid
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../assets/logo_medisupply_principal.png';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '', // Esto se mapeará a email en el login thunk
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

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setFormErrors({});
    dispatch(clearError());

    // Validate form
    const errors = {};
    if (!credentials.username.trim()) {
      errors.username = 'El nombre de usuario es obligatorio';
    }
    if (!credentials.password.trim()) {
      errors.password = 'La contraseña es obligatoria';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const resultAction = await dispatch(login(credentials));
      if (login.fulfilled.match(resultAction)) {
        // Successful login - navigation is handled by the protected route
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Mostrar estado de error para depuración
  console.log('Login component rendering with error:', error);

  return (
    <Box 
      sx={{
        height: '100vh',
        display: 'flex',
        backgroundColor: theme => theme.palette.background.default
      }}
    >
      {/* Contenedor principal */}
      <Grid 
        container 
        sx={{ 
          width: '100%',
          maxWidth: '1200px',
          mx: 'auto',
          px: { xs: 2, md: 4 }
        }}
      >
        {/* Formulario de login (izquierda con tarjeta) */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            order: { xs: 2, md: 1 } // En móvil aparece segundo, en desktop primero
          }}
        >
          <Paper 
            elevation={3} 
            sx={{
              width: '100%',
              maxWidth: '500px',
              mx: 'auto',
              p: { xs: 3, sm: 4 },
              borderRadius: 2,
              my: { xs: 3, md: 0 }
            }}
          >
            <Box 
              component="form" 
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                Login
              </Typography>
               
              {/* Mostrar mensaje de error si existe */}
              {error && (
                <Box data-testid="login-error-message" sx={{ mb: 3 }}>
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                </Box>
              )}

              <TextField 
                label="Email" // Cambiado de "Usuario" a "Email" para reflejar la API
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
                autoComplete="email"
                type="email" // Especificar tipo email
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
          </Paper>
        </Grid>
        
        {/* Logo (derecha sin tarjeta) */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            order: { xs: 1, md: 2 } // En móvil aparece primero, en desktop segundo
          }}
        >
          <Box 
            component="img" 
            src={logo} 
            alt="MediSupply Logo"
            sx={{
              width: { xs: '70%', sm: '60%', md: '80%' },
              maxWidth: '350px',
              objectFit: 'contain',
              mb: { xs: 2, md: 0 }
            }}
          />
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 700,
              textAlign: 'center',
              display: { xs: 'block', md: 'block' }
            }}
          >
            MediSupply
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 2,
              color: 'text.secondary',
              textAlign: 'center',
              maxWidth: '80%',
              display: { xs: 'block', md: 'block' }
            }}
          >
            Sistema de gestión de inventarios para suministros médicos
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
