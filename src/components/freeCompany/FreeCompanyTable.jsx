import { React } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import LayeredImage from 'components/global/LayeredImage';

function FreeCompanyTable({ freeCompanies }) {
  const tableHeaders = ['Crest', 'FC Name', 'Server'];
  const crestWidth = 50;

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
          <tr key={fc.ID} style={{ height: crestWidth + 16 }}>
            <td>
              <LayeredImage layers={fc.Crest} style={{ width: crestWidth }} />
            </td>
            <td style={{ verticalAlign: 'middle' }}>{fc.Name}</td>
            <td style={{ verticalAlign: 'middle' }}>{fc.Server}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

FreeCompanyTable.propTypes = {
  freeCompanies: PropTypes.arrayOf(PropTypes.shape),
};

FreeCompanyTable.defaultProps = {
  freeCompanies: [],
};

export default FreeCompanyTable;
