/* eslint-disable jsx-a11y/alt-text */
import { React } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

function LayeredImage({ layers, style }) {
  return (
    <span
      style={{
        ...style,
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {layers.map((layer) => (
        <Image
          key={layer}
          src={layer}
          style={{ position: 'absolute', width: 'inherit' }}
        />
      ))}
    </span>
  );
}

LayeredImage.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.objectOf(PropTypes.shape),
};

LayeredImage.defaultProps = {
  style: {},
};

export default LayeredImage;
