import React from "react";
import moment from "moment";
import Table from "react-bootstrap/Table";

const TablePreview = ({ sheetHeader, sheetData }) => {

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
        <Table data-testid="table-container" striped bordered hover>
          <thead>
            <tr>{thead}</tr>
          </thead>
          <tbody>{tbody}</tbody>
        </Table>
    );
  };
  return renderTablePreview();
};

export default TablePreview;
