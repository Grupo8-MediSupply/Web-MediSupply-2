import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchInventario, 
  updateFiltro, 
  selectFilteredItems,
  addInventarioItem
} from '../redux/features/inventarioSlice';
import { 
  Container, 
  Typography, 
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Inventarios() {
  const dispatch = useDispatch();
  const inventarioItems = useSelector(selectFilteredItems);
  const { status, error, filtro, items } = useSelector(state => state.inventario);

  // Estado local para el formulario de nuevo item
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    nombre: '',
    cantidad: 0,
    categoria: '',
    ubicacion: ''
  });

  // Obtener categorías y ubicaciones únicas para los filtros
  const categorias = [...new Set(items.map(item => item.categoria))];
  const ubicaciones = [...new Set(items.map(item => item.ubicacion))];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchInventario());
    }
  }, [status, dispatch]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFiltro({ [name]: value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: name === 'cantidad' ? parseInt(value) || 0 : value
    });
  };

  const handleAddItem = () => {
    dispatch(addInventarioItem(newItem));
    setOpen(false);
    setNewItem({
      nombre: '',
      cantidad: 0,
      categoria: '',
      ubicacion: ''
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gestión de Inventarios
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Nuevo Item
          </Button>
        </Box>
        
        {/* Filtros */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel>Categoría</InputLabel>
            <Select
              name="categoria"
              value={filtro.categoria}
              onChange={handleFilterChange}
              label="Categoría"
            >
              <MenuItem value="">Todas</MenuItem>
              {categorias.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel>Ubicación</InputLabel>
            <Select
              name="ubicacion"
              value={filtro.ubicacion}
              onChange={handleFilterChange}
              label="Ubicación"
            >
              <MenuItem value="">Todas</MenuItem>
              {ubicaciones.map(ubi => (
                <MenuItem key={ubi} value={ubi}>{ubi}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        {status === 'loading' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Error al cargar los datos: {error}
          </Alert>
        )}
        
        {status === 'succeeded' && (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Ubicación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventarioItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                    <TableCell>{item.categoria}</TableCell>
                    <TableCell>{item.ubicacion}</TableCell>
                  </TableRow>
                ))}
                {inventarioItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No se encontraron items</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      
      {/* Diálogo para nuevo item */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Nuevo Item</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1, minWidth: '400px' }}>
            <TextField
              name="nombre"
              label="Nombre del producto"
              fullWidth
              value={newItem.nombre}
              onChange={handleNewItemChange}
            />
            <TextField
              name="cantidad"
              label="Cantidad"
              type="number"
              fullWidth
              value={newItem.cantidad}
              onChange={handleNewItemChange}
            />
            <TextField
              name="categoria"
              label="Categoría"
              fullWidth
              value={newItem.categoria}
              onChange={handleNewItemChange}
            />
            <TextField
              name="ubicacion"
              label="Ubicación"
              fullWidth
              value={newItem.ubicacion}
              onChange={handleNewItemChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">Cancelar</Button>
          <Button onClick={handleAddItem} variant="contained" color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Inventarios;
