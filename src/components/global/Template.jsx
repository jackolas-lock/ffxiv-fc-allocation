import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

function Template({ className }) {
  return (
    <Container className={className} />
  );
}

Template.propTypes = {
  className: PropTypes.string,
};

Template.defaultProps = {
  className: '',
};

export default Template;
