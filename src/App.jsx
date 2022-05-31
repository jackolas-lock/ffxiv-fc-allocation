import React, { useState } from 'react';
import 'bootswatch/dist/journal/bootstrap.min.css';
import './App.css';
import LeftNav from 'components/leftNav/LeftNav';
import FreeCompany from 'components/pages/selections/FreeCompany';
import Members from 'components/pages/selections/Members';

function App() {
  const [viewHeight] = useState(window.document.documentElement.clientHeight);
  const [activePage, setActivePage] = useState('members');

  return (
    <div className="app" style={{ height: viewHeight }}>
      <LeftNav
        className="sidebar"
        activePage={activePage}
        onClick={(e) => setActivePage(e)}
      />
      <main>
        {activePage === 'freeCompany' && <FreeCompany />}
        {activePage === 'members' && <Members />}
      </main>
    </div>
  );
}

export default App;
