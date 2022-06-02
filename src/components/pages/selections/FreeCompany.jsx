import { React, useEffect, useState } from 'react';
import { Col, Form, Row, Button, Spinner } from 'react-bootstrap';
import Select from 'react-select';
import FreeCompanyCard from 'components/freeCompany/FreeCompanyCard';
import FreeCompanyTable from 'components/freeCompany/FreeCompanyTable';
import { saveLocal, getLocal } from 'components/global/helpers';

function FreeCompany() {
  const [availableServers, setAvailableServers] = useState([]);
  const [fcName, setFcName] = useState(getLocal('fcName'));
  const [fcServer, setFcServer] = useState(getLocal('fcServer'));
  const [selectedFC, setSelectedFC] = useState(getLocal('selectedFC'));
  const [tableData, setTableData] = useState(getLocal('lastFcSearch'));
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
    saveLocal('fcName', fcName);
    saveLocal('fcServer', fcServer);
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
    saveLocal('selectedFC', selectedFC);
    saveLocal('lastFcSearch', tableData);
  }, [selectedFC, tableData]);

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
                <Select
                  placeholder="Server (optional)"
                  isClearable
                  defaultValue={
                    fcServer ? { label: fcServer, value: fcServer } : null
                  }
                  options={availableServers}
                  onChange={(e) => setFcServer(e?.value ?? '')}
                />
              </Col>
              <Col lg={4}>
                <Button disabled={loading} onClick={searchFCs}>
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
