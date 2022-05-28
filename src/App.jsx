import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import LeftNav from './components/leftNav/LeftNav';

function App() {
  const viewHeight = window.outerHeight;

  return (
    <div style={{ height: viewHeight }}>
      <LeftNav className="sidebar" />
      <Container className="container" />
    </div>
  );
}

export default App;
