import { React, useEffect, useState } from 'react';
import { Col, Row, Button, Spinner } from 'react-bootstrap';
import FreeCompanyCard from 'components/freeCompany/FreeCompanyCard';
import MemberTable from 'components/member/MemberTable';
import { saveLocal, getLocal, isEmptyObject } from 'components/global/helpers';

function Members() {
  const [selectedFC] = useState(getLocal('selectedFC'));
  const [members, setMembers] = useState(getLocal('members'));
  const [loading, setLoading] = useState(false);

  const getMembers = () => {
    setLoading(true);
    if (isEmptyObject(selectedFC)) {
      // TODO: better alert
      alert('Please select a free company.');
      setLoading(false);
    } else {
      fetch(`https://xivapi.com/freecompany/${selectedFC.ID}?data=FCM`)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setMembers(data.FreeCompanyMembers);
        });
    }
  };

  useEffect(() => {
    saveLocal('members', members);
  }, [members]);

  return (
    <>
      <Row>
        <Col lg={8}>
          <Row>
            <h1>Members</h1>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col>
              <Button disabled={loading} onClick={getMembers}>
                {loading ? (
                  <>
                    <Spinner as="span" size="sm" animation="border" />{' '}
                    Fetching...
                  </>
                ) : (
                  'Fetch Members from FC'
                )}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <FreeCompanyCard fc={selectedFC} />
        </Col>
      </Row>
      <Row>
        <Col>
          <MemberTable members={members} />
        </Col>
      </Row>
    </>
  );
}

export default Members;
