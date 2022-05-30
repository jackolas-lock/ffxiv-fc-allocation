import { React, useEffect, useState } from 'react';
import { Col, Form, Row, Button, Spinner } from 'react-bootstrap';
import Select from 'react-select';
import FreeCompanyCard from 'components/freeCompany/FreeCompanyCard';
import FreeCompanyTable from 'components/freeCompany/FreeCompanyTable';

function FreeCompany() {
  const [availableServers, setAvailableServers] = useState([]);
  const [fcName, setFcName] = useState(localStorage.getItem('fcName'));
  const [fcServer, setFcServer] = useState(localStorage.getItem('fcServer'));
  const [selectedFC, setSelectedFC] = useState(
    JSON.parse(localStorage.getItem('selectedFC'))
  );
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getServers = () => {
    fetch('https://xivapi.com/servers/dc')
      .then((response) => response.json())
      .then((data) => {
        const fetchedServers = [];
        Object.keys(data).forEach((key) => {
          fetchedServers.push({
            label: key,
            options: data[key].map((server) => ({
              value: server,
              label: server,
            })),
          });
        });
        setAvailableServers(fetchedServers);
      });
  };

  const searchFCs = () => {
    setLoading(true);
    const url = `https://xivapi.com/freecompany/search?name=${fcName}&server=${fcServer}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setTableData(data.Results);
      });
  };

  useEffect(() => {
    getServers();
  }, []);

  useEffect(() => {
    localStorage.setItem('fcName', fcName);
    localStorage.setItem('fcServer', fcServer);
    localStorage.setItem('selectedFC', JSON.stringify(selectedFC));
  }, [fcName, fcServer, selectedFC]);

  return (
    <>
      <Row>
        <Col lg={8}>
          <h1>Free Company</h1>
        </Col>
        <Col lg={4}>
          <FreeCompanyCard fc={selectedFC} />
        </Col>
      </Row>
      <Form>
        <Row>
          <Col lg={2}>
            <Form.Control
              type="text"
              placeholder="FC Name"
              value={fcName}
              onChange={(e) => setFcName(e.target.value)}
            />
          </Col>
          <Col lg={2}>
            <Select
              placeholder="Server (optional)"
              value={{ label: fcServer, value: fcServer }}
              options={availableServers}
              onChange={(e) => setFcServer(e.value)}
            />
          </Col>
          <Col lg={2}>
            <Button variant="primary" disabled={loading} onClick={searchFCs}>
              {loading ? (
                <>
                  <Spinner as="span" size="sm" animation="border" />{' '}
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
          <FreeCompanyTable
            freeCompanies={tableData}
            handleSelectFC={setSelectedFC}
          />
        </Col>
      </Row>
    </>
  );
}

export default FreeCompany;
