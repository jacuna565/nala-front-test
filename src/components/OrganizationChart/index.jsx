import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "./Chart";

const OrganizationChart = ({groupedByMonth, sheetData, sheetHeader}) => {
  const [options, setOptions] = useState();
  const [monthSelected, setMonthSelected] = useState();
  const [staff, setStaff] = useState();

  useEffect(() => {
    getOptionsPicker();
  },[groupedByMonth])

  useEffect(() => {
    monthSelected !== undefined && renderChart();
  },[monthSelected])

  const getOptionsPicker = () => {
    let options = [];
    groupedByMonth.forEach((item, index) => {
      index === 0 && setMonthSelected(item.month)
      options.push(
        <option key={index} value={item.month}>
          {item.month}
        </option>
      );
    });
    setOptions(options)
  };

  const handleSelectChange = (event) => {
    setMonthSelected(event.target.value);
  };

  const renderChart = () => {
    let findMonth = [];
    findMonth = _.find(groupedByMonth, function (item) {
      return item.month === monthSelected;
    });
    let staff = _.get(findMonth, "staff");
    setStaff(staff);
  }

  return(
    <>
      <Row>
        <Col xs={12} sm={12} md={3}>
          <Form.Group controlId="SelectCustom">
            <Form.Label>Filter by month</Form.Label>
            <Form.Control
              as="select"
              custom
              onChange={handleSelectChange}
              value={monthSelected}
            >
              {options}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      {<Chart staff={staff} sheetData={sheetData[0].data} monthSelected={monthSelected} sheetHeader={sheetHeader}/>}
    </>
  )
};

export default OrganizationChart;