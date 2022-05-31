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
    localStorage.setItem('fcName', fcName);
    localStorage.setItem('fcServer', fcServer);
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
    localStorage.setItem('selectedFC', JSON.stringify(selectedFC));
  }, [selectedFC]);

  return (
    <>
      <Row>
        <Col lg={8}>
          <Row>
            <h1>Free Company</h1>
          </Row>
          <Form>
            <Row style={{ marginTop: 10 }}>
              <Col lg={4}>
                <Form.Control
                  type="text"
                  placeholder="FC Name"
                  value={fcName}
                  onChange={(e) => setFcName(e.target.value)}
                />
              </Col>
              <Col lg={4}>
                {/* TODO: Style this select */}
                <Select
                  placeholder="Server (optional)"
                  isClearable
                  defaultValue={{ label: fcServer, value: fcServer }}
                  options={availableServers}
                  onChange={(e) => setFcServer(e?.value ?? '')}
                />
              </Col>
              <Col lg={4}>
                <Button
                  variant="primary"
                  disabled={loading}
                  onClick={searchFCs}
                >
                  {/* TODO: Save last search */}
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
        </Col>
        <Col lg={4}>
          <FreeCompanyCard fc={selectedFC} />
        </Col>
      </Row>
      <Row>
        <Col>
          <FreeCompanyTable
            freeCompanies={tableData}
            selectedFC={selectedFC}
            handleSelectFC={setSelectedFC}
          />
        </Col>
      </Row>
    </>
  );
}

export default FreeCompany;
