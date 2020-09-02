import React, { useState, useEffect } from "react";
import moment from "moment";
import _ from "lodash";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputFile from "./components/InputFile";
import TablePreview from "./components/TablePreview";
import Button from "./components/Button";
import OrganizationChart from "./components/OrganizationChart";

const App = () => {
  const [sheetData, setSheetData] = useState();
  const [sheetHeader, setSheetHeader] = useState([]);
  const [showOrganizationChart, setShowOrganizationChart] = useState(false);
  const [groupedByMonth, setGroupedByMonth] = useState([]);

  useEffect(() => {
    if (sheetData !== undefined) {
      setSheetHeader(Object.keys(sheetData[0].data[0]));
    }
  }, [sheetData]);

  const handleSheetData = (data) => {
    setSheetData(data);
  };

  const handleOrganizationChart = () => {
    let groupedByMonth = _.chain(sheetData[0].data)
      .groupBy(sheetHeader[0])
      .map((value, key) => ({
        month: moment(key).format("MM-YYYY"),
        staff: value,
      }))
      .value();

    setGroupedByMonth(groupedByMonth);
    setShowOrganizationChart(true);
  };

  return (
    <Container data-testid="app-container">
      <Row>
        <Col xs={12}>
          <InputFile setData={handleSheetData} label="Pick the Excel file" />
        </Col>
      </Row>
      {sheetHeader && sheetData && !showOrganizationChart && (
        <>
          <Row>
            <Col>
              <h3>Table preview</h3>
            </Col>
            <Col>
              <Button
                text="Organitation chart"
                onClick={handleOrganizationChart}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TablePreview sheetHeader={sheetHeader} sheetData={sheetData} />
            </Col>
          </Row>
        </>
      )}
      {showOrganizationChart && (
        <Row>
          <Col>
            <OrganizationChart
              groupedByMonth={groupedByMonth}
              sheetData={sheetData}
              sheetHeader={sheetHeader}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default App;
