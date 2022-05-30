import { React, useEffect, useState } from 'react';
import { Col, Form, Row, Button, Table, Spinner } from 'react-bootstrap';
import Select from 'react-select';
import LayeredImage from 'components/global/LayeredImage';

function FreeCompany() {
  const [servers, setServers] = useState([]);
  const [fcName, setFcName] = useState('');
  const [fcServer, setFcServer] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const tableHeaders = ['Crest', 'FC Name', 'Server'];
  const crestWidth = 50;

  const getServers = () => {
    fetch('https://xivapi.com/servers/dc')
      .then((response) => response.json())
      .then((data) => {
        const dataCenterOptions = [];
        Object.keys(data).forEach((key) => {
          dataCenterOptions.push({
            label: key,
            options: data[key].map((server) => ({
              value: server,
              label: server,
            })),
          });
        });
        setServers(dataCenterOptions);
      });
  };

  const searchFCs = () => {
    setLoading(true);
    const url = `https://xivapi.com/freecompany/search?name=${fcName}&server=${fcServer}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        const rows = data.Results.map((fc) => (
          <tr key={fc.ID} style={{ height: crestWidth + 16 }}>
            <td>
              <LayeredImage layers={fc.Crest} style={{ width: crestWidth }} />
            </td>
            <td>{fc.Name}</td>
            <td>{fc.Server}</td>
          </tr>
        ));
        setTableData(rows);
      });
  };

  useEffect(() => {
    getServers();
  }, []);

  return (
    <>
      <Row>
        <h1>Free Company</h1>
      </Row>
      <Form>
        <Row>
          <Col lg={3}>
            <Form.Control
              type="text"
              placeholder="FC Name"
              onChange={(e) => setFcName(e.target.value)}
            />
          </Col>
          <Col lg={3}>
            <Select
              placeholder="Server (optional)"
              options={servers}
              onChange={(e) => setFcServer(e.value)}
            />
          </Col>
          <Col lg={6}>
            <Button
              variant="primary"
              disabled={loading}
              onClick={() => searchFCs()}
            >
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
          <Table style={{ marginTop: 30 }} striped hover>
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>{tableData}</tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}

export default FreeCompany;
