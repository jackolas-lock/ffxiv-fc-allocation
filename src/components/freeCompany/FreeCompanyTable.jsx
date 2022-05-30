import { React } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import LayeredImage from 'components/global/LayeredImage';

function FreeCompanyTable({ freeCompanies, handleSelectFC }) {
  const tableHeaders = ['Crest', 'FC Name', 'Server'];
  const crestSize = 50;

  return (
    <Table style={{ marginTop: 30 }} striped hover>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {freeCompanies.map((fc) => (
          <tr key={fc.ID} style={{ height: crestSize + 16 }}>
            <td>
              <LayeredImage layers={fc.Crest} style={{ width: crestSize }} />
            </td>
            <td style={{ verticalAlign: 'middle' }}>{fc.Name}</td>
            <td style={{ verticalAlign: 'middle' }}>{fc.Server}</td>
            <td style={{ verticalAlign: 'middle' }}>
              <Button variant="primary" onClick={() => handleSelectFC(fc)}>
                Select
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

FreeCompanyTable.propTypes = {
  freeCompanies: PropTypes.arrayOf(PropTypes.shape),
  handleSelectFC: PropTypes.func.isRequired,
};

FreeCompanyTable.defaultProps = {
  freeCompanies: [],
};

export default FreeCompanyTable;
