import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Form, Image } from 'react-bootstrap';
import { getLocal, saveLocal } from 'components/global/helpers';

function MemberTable({ members }) {
  const tableHeaders = ['', 'Avatar', 'Name', 'Rank'];
  const [selectedMembers, setSelectedMembers] = useState(
    getLocal('selectedMembers')
  );

  const handleSelectMember = (e, member) => {
    if (e.target.checked) {
      setSelectedMembers([...selectedMembers, member]);
    } else {
      const filteredMembers = selectedMembers.filter((m) => m.ID !== member.ID);
      setSelectedMembers(filteredMembers);
    }
  };

  useEffect(() => {
    saveLocal('selectedMembers', selectedMembers);
  }, [selectedMembers]);

  return (
    <Table style={{ marginTop: 30 }} hover>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr
            key={member.ID}
            className={
              selectedMembers.some((m) => m.ID === member.ID)
                ? 'table-success'
                : ''
            }
          >
            <td style={{ verticalAlign: 'middle' }}>
              <Form.Check
                type="checkbox"
                checked={selectedMembers.some((m) => m.ID === member.ID)}
                onChange={(e) => handleSelectMember(e, member)}
              />
            </td>
            <td style={{ verticalAlign: 'middle' }}>
              <Image style={{ width: 50 }} rounded src={member.Avatar} />
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
