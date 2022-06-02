import { React, useEffect, useState } from 'react';
import { Col, Row, Button, Spinner } from 'react-bootstrap';
import FreeCompanyCard from 'components/freeCompany/FreeCompanyCard';
import MemberTable from 'components/member/MemberTable';
import { saveLocal, getLocal } from 'components/global/helpers';

function Mounts() {
  const [selectedMembers] = useState(getLocal('selectedMembers') ?? []);
  const [mimoInfo, setMimoInfo] = useState(getLocal('mimoInfo') ?? []);
  const [loading, setLoading] = useState(false);

  const getMimo = () => {
    setLoading(true);
    if (!selectedMembers) {
      // TODO: better alert
      alert('No players selected.');
    } else {
      const fetchedMimo = [];
      const promises = selectedMembers.map((member) =>
        fetch(`https://xivapi.com/character/${member.ID}?data=MIMO`)
      );

      Promise.all(promises)
        .then((responses) =>
          Promise.all(responses.map((response) => response.json()))
        )
        .then((data) => {
          Object.values(data).forEach((mimo) => {
            const fetchedData = mimo;
            fetchedData.ID = mimo.Character.ID;
            fetchedMimo.push(fetchedData);
          });
        })
        .then(() => {
          setMimoInfo(fetchedMimo);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    saveLocal('mimoInfo', mimoInfo);
  }, [mimoInfo]);

  return (
    <>
      <Row>
        <Col lg={12}>
          <Row>
            <h1>Mounts</h1>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col>
              <Button disabled={loading} onClick={getMimo}>
                {loading ? (
                  <>
                    <Spinner as="span" size="sm" animation="border" />{' '}
                    Fetching...
                  </>
                ) : (
                  'Refresh'
                )}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>{/* <MemberTable members={members} /> */}</Col>
      </Row>
    </>
  );
}

export default Mounts;
