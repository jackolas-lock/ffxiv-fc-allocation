import React from 'react';
import './App.css';
import Template from './components/global/Template';
import LeftNav from './components/leftNav/LeftNav';

function App() {
  const viewHeight = window.outerHeight;

  return (
    <div style={{ height: viewHeight }}>
      <LeftNav className="sidebar" />
      <Template className="container" />
    </div>
  );
}

export default App;
