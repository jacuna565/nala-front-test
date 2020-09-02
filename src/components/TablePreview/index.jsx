import React from 'react';
import moment from "moment";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TablePreview = ({sheetHeader, sheetData}) => {
  const renderTablePreview = () => {
    let thead =
      sheetHeader &&
      sheetHeader.map((item, index) => {
        return <th key={index}>{item}</th>;
      });

    let tbody =
      sheetData &&
      sheetData[0].data.map((item, index) => {
        return (
          <tr key={index}>
            <td>{moment(item[sheetHeader[0]]).format("MM-YYYY")}</td>
            <td>{item[sheetHeader[1]]}</td>
            <td>{item[sheetHeader[2]]}</td>
            <td>{moment(item[sheetHeader[3]]).format("DD/MM/YYYY")}</td>
            <td>{item[sheetHeader[4]]}</td>
            <td>{item[sheetHeader[5]]}</td>
            <td>{item[sheetHeader[6]]}</td>
            <td>{item[sheetHeader[7]]}</td>
            <td>{item[sheetHeader[8]]}</td>
            <td>{item[sheetHeader[9]]}</td>
          </tr>
        );
      });

    return (
      <>
        {sheetHeader && sheetData && (
          <>
            <Row>
              <Col>
                <h3>Table preview</h3>
              </Col>
              <Col>
                <Button>
                  See Organitation chart
                </Button>
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>{thead}</tr>
              </thead>
              <tbody>{tbody}</tbody>
            </Table>
          </>
        )}
      </>
    );
  };
  return(renderTablePreview())
};

export default TablePreview;