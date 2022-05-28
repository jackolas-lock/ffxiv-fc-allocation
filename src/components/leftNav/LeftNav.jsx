import React from 'react';
import PropTypes from 'prop-types';
import {
  ProSidebar, Menu, MenuItem, SubMenu,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHorse, faPaw, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function LeftNav({ className }) {
  return (
    <ProSidebar className={className}>
      <Menu iconShape="square">
        <SubMenu title="Selections" icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}>
          <MenuItem>Free Company</MenuItem>
          <MenuItem>Members</MenuItem>
          <MenuItem>Player search</MenuItem>
        </SubMenu>
        <MenuItem icon={<FontAwesomeIcon icon={faPaw} />}>Minions</MenuItem>
        <MenuItem icon={<FontAwesomeIcon icon={faHorse} />}>Mounts</MenuItem>
      </Menu>
    </ProSidebar>
  );
}

LeftNav.propTypes = {
  className: PropTypes.string,
};

LeftNav.defaultProps = {
  className: '',
};

export default LeftNav;
