import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Card,
  CardContent,
  Grid,
  Divider
} from '@mui/material';

function About() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Acerca de MediSupply
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" paragraph>
          MediSupply es una aplicación diseñada para ayudar a las instituciones médicas
          a gestionar sus inventarios de suministros de manera eficiente.
        </Typography>
        <Typography variant="body1" paragraph>
          Nuestro sistema permite a hospitales y clínicas rastrear, organizar y optimizar 
          su inventario de suministros médicos, garantizando que siempre tengan lo que necesitan
          cuando lo necesitan.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Características principales
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Control de inventario
                  </Typography>
                  <Typography variant="body2">
                    Sistema completo para registrar, actualizar y seguir el movimiento de suministros.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Reportes y análisis
                  </Typography>
                  <Typography variant="body2">
                    Generación de informes detallados sobre uso, stock y necesidades de reposición.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Proyecto académico
          </Typography>
          <Typography variant="body1">
            Proyecto desarrollado como parte del curso de proyecto final en la Universidad de los Andes.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default About;
