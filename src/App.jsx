import React, { useState } from 'react';
import './App.css';
import LeftNav from 'components/leftNav/LeftNav';
import FreeCompany from 'components/pages/selections/FreeCompany';

function App() {
  const [viewHeight] = useState(window.document.documentElement.clientHeight);
  const [activePage, setActivePage] = useState('freeCompany');

  return (
    <div className="app" style={{ height: viewHeight }}>
      <LeftNav
        className="sidebar"
        activePage={activePage}
        onClick={(e) => setActivePage(e)}
      />
      <main>{activePage === 'freeCompany' && <FreeCompany />}</main>
    </div>
  );
}

export default App;
