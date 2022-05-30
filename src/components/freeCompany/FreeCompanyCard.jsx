import { React } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function FreeCompanyCard({ fc }) {
  return (
    <Card border="info" className="text-center">
      <Card.Header>
        <em>Selected FC</em>
      </Card.Header>
      <Card.Body>
        {fc ? (
          <Card.Text>
            <strong>
              {fc.Name} | {fc.Server}
            </strong>
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
    Crest: PropTypes.arrayOf(PropTypes.string),
    Name: PropTypes.string,
    Server: PropTypes.string,
  }),
};

FreeCompanyCard.defaultProps = {
  fc: {},
};

export default FreeCompanyCard;
