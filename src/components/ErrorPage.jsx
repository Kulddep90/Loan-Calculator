import React from 'react';
import { Button, Container, Typography, Box, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',    // centers vertically
          minHeight: '100vh',      // full viewport height
          width: '100vw',
          backgroundColor: 'white'
        }}
      >
        <Container 
          maxWidth="sm" 
          sx={{ 
            textAlign: 'center',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center' // This ensures content inside Container is centered
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'error.main', mb: 2 }}>
            Something went wrong in the application.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
            sx={{ mt: 3 }}
          >
            GO HOME
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default ErrorPage;