import { React, useEffect, useState } from 'react';
import { Col, Form, Row, Button, Table } from 'react-bootstrap';
import Select from 'react-select';

function FreeCompany() {
  const [servers, setServers] = useState([]);
  const [fcName, setFcName] = useState('');
  const [fcServer, setFcServer] = useState('');
  const [tableData, setTableData] = useState([]);
  const tableHeaders = ['Crest', 'FC Name', 'Server'];

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
    const url = `https://xivapi.com/freecompany/search?name=${fcName}&server=${fcServer}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const rows = data.Results.map((fc) => (
          <tr key={fc.ID}>
            <td> </td>
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
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="FC Name"
              onChange={(e) => setFcName(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Select
              placeholder="Server (optional)"
              options={servers}
              onChange={(e) => setFcServer(e.value)}
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" onClick={() => searchFCs()}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
          <Table style={{ marginTop: 30 }} striped bordered hover>
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
