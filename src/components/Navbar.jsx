import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { FaMoon, FaSun } from 'react-icons/fa';
import { IconButton } from '@mui/material';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.className = theme;
    document.body.style.backgroundColor = '#ffffff';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <AppBar 
      position="fixed" // Changed from 'static' to 'fixed'
      sx={{ 
        backgroundColor: theme === 'light' ? '#1976d2' : '#121212', // MUI color standards
        width: '100%' // Full width
      }}
    >
      <Toolbar sx={{ 
        maxWidth: 'lg', 
        margin: '0 auto', 
        width: '100%',
        padding: '0 16px' // Added padding for better spacing on mobile
      }}>
        <Typography variant="h6" component="div" sx={{ 
          flexGrow: 1, 
          color: 'white',
          fontWeight: 'bold'
        }}>
          Loan Calculator
        </Typography>
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, // Hide on mobile, show on desktop
          gap: 2,
          alignItems: 'center'
        }}>
          <Button 
            color="inherit" 
            href="/" 
            sx={{ 
              color: 'white', 
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)' 
              },
              fontWeight: 'medium',
              minWidth: 'auto' // Remove minimum width
            }}
          >
            HOME
          </Button>
          <Button 
            color="inherit" 
            href="/exchange-rates" 
            sx={{ 
              color: 'white', 
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)' 
              },
              fontWeight: 'medium',
              minWidth: 'auto'
            }}
          >
            EXCHANGE RATES (LIVE)
          </Button>
          <Button 
            color="inherit" 
            href="/about" 
            sx={{ 
              color: 'white', 
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)' 
              },
              fontWeight: 'medium',
              minWidth: 'auto'
            }}
          >
            ABOUT
          </Button>
          <Button 
            color="inherit" 
            href="/error" 
            sx={{ 
              color: 'white', 
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)' 
              },
              fontWeight: 'medium',
              minWidth: 'auto'
            }}
          >
            ERROR PAGE
          </Button>
          <IconButton
            onClick={handleThemeToggle}
            sx={{ 
              color: 'white', 
              ml: 2, 
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)' 
              }
            }}
            aria-label="toggle theme"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;