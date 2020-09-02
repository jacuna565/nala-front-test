import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputFile from "./components/InputFile";
import TablePreview from "./components/TablePreview";
import "./App.css";

const App = () => {
  const [sheetData, setSheetData] = useState();
  const [sheetHeader, setSheetHeader] = useState([]);

  useEffect(() => {
    if (sheetData !== undefined) {
      setSheetHeader(Object.keys(sheetData[0].data[0]));
    }
  }, [sheetData]);

  const handleSheetData = (data) => {
    setSheetData(data)
  };    

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <InputFile setData={handleSheetData} label="Pick the Excel file"/>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <TablePreview sheetHeader={sheetHeader} sheetData={sheetData}/></Col>
      </Row>
    </Container>
  );
};

export default App;
