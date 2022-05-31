import { React } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function FreeCompanyCard({ fc }) {
  return (
    <Card border="info" className="text-center">
      <Card.Header>
        <h3 style={{ marginBottom: 0 }}>Selected FC</h3>
      </Card.Header>
      <Card.Body>
        {fc ? (
          <Card.Text>
            <h5>
              {fc.Name} | {fc.Server}
            </h5>
          </Card.Text>
        ) : (
          'No FC Selected'
        )}
      </Card.Body>
    </Card>
  );
}

FreeCompanyCard.propTypes = {
  fc: PropTypes.shape({
    ID: PropTypes.string,
    Crest: PropTypes.arrayOf(PropTypes.string),
    Name: PropTypes.string,
    Server: PropTypes.string,
  }),
};

FreeCompanyCard.defaultProps = {
  fc: {},
};

export default FreeCompanyCard;
