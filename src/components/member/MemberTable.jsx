import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Form } from 'react-bootstrap';

function MemberTable({ members }) {
  const tableHeaders = ['', 'Name', 'Rank'];
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSelectMember = (member) => {
    console.log(member);
  };

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
        {members.map((member) => (
          <tr key={member.ID}>
            <td>
              <Form.Check
                type="checkbox"
                onChange={() => handleSelectMember(member)}
              />
            </td>
            <td style={{ verticalAlign: 'middle' }}>{member.Name}</td>
            <td style={{ verticalAlign: 'middle' }}>{member.Rank}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

MemberTable.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape),
};

MemberTable.defaultProps = {
  members: [],
};

export default MemberTable;
