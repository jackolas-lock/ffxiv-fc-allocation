import React, { useEffect, useState } from 'react';
import 'bootswatch/dist/journal/bootstrap.min.css';
import './App.css';
import LeftNav from 'components/leftNav/LeftNav';
import FreeCompany from 'components/pages/selections/FreeCompany';
import Members from 'components/pages/selections/Members';
import Mounts from 'components/pages/Mounts';
import { getLocal, saveLocal } from 'components/global/helpers';

function App() {
  const [viewHeight] = useState(window.document.documentElement.clientHeight);
  const [activePage, setActivePage] = useState(getLocal('activePage'));

  useEffect(() => {
    saveLocal('activePage', activePage);
  }, [activePage]);

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
        {activePage === 'mounts' && <Mounts />}
      </main>
    </div>
  );
}

export default App;
