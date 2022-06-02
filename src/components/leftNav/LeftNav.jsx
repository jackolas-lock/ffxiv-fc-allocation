import React from 'react';
import PropTypes from 'prop-types';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faHorse,
  faPaw,
  faHouse,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

function LeftNav({ className, onClick }) {
  return (
    <ProSidebar
      className={className}
      image={`${process.env.PUBLIC_URL}/worldmap.png`}
    >
      <Menu iconShape="circle">
        <SubMenu
          title="Selections"
          icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        >
          <MenuItem
            onClick={() => onClick('freeCompany')}
            icon={<FontAwesomeIcon icon={faHouse} />}
          >
            Free Company
          </MenuItem>
          <MenuItem
            onClick={() => onClick('members')}
            icon={<FontAwesomeIcon icon={faUsers} />}
          >
            Members
          </MenuItem>
          {/* <MenuItem
            onClick={() => onClick('playerSearch')}
            icon={<FontAwesomeIcon icon={faUser} />}
          >
            Player search
          </MenuItem> */}
        </SubMenu>
        <MenuItem
          onClick={() => onClick('mounts')}
          icon={<FontAwesomeIcon icon={faHorse} />}
        >
          Mounts
        </MenuItem>
        <MenuItem
          onClick={() => onClick('minions')}
          icon={<FontAwesomeIcon icon={faPaw} />}
        >
          Minions
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
}

LeftNav.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

LeftNav.defaultProps = {
  className: '',
};

export default LeftNav;
