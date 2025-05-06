import React from 'react';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline /> 
      <Navbar/>
      <main style={{ flex: 1, marginTop: '64px' }}> {/* Added marginTop to main */}
        <Home />
      </main>
    </div>
  );
}

export default App;
