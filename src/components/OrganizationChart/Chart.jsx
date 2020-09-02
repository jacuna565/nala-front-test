import React, { useEffect, useState } from "react";
import _ from "lodash";
import moment from "moment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import "./styles.scss";

const Chart = ({ staff, sheetData, monthSelected, sheetHeader }) => {
  const [staffCard, setStaffCard] = useState("");
  useEffect(() => {
    staff && renderStaff();
  }, [staff]);

  const renderStaff = () => {
    let subordinates = [];
    let data = [];
    staff.forEach((item) => {
      subordinates = [];
      staff.forEach((element) => {
        if (item[sheetHeader[2]] === element[sheetHeader[8]]) {
          subordinates.push(element);
        }
      });
      data.push({
        lider: item,
        subordinates: subordinates,
      });
    });

    console.log(data);
    console.log('find lider as subordinate')
    data.forEach(item => {
      item.subordinates.forEach(element => {
        data.forEach(el => {
          if(el.lider[sheetHeader[2]] === element[sheetHeader[2]]){
            console.log('es subordinado',el.lider)
            console.log('de',item.lider)
            
          }
        })
        
      })
    })

    let allCardsStaff = data.map((item, index) => {
      let subordinates = (
        <Row key={index}>
          {item.subordinates.map((element, index) => {
            return (
              <Col key={index}>
                <p className="staff-name">{element[sheetHeader[1]]}</p>
                <p className="staff-area">
                  {element["Area"]} / {element["Subarea"]}
                </p>
                <p className="staff-area">{element[sheetHeader[4]]}</p>
                <p className="staff-area">{element[sheetHeader[9]]}</p>
                <p className="staff-badge-pay">
                  {findSalaryRaise(element) ? (
                    <Badge variant="success">Pay Rise</Badge>
                  ) : (
                    ""
                  )}
                </p>
                <p className="staff-badge-hire">
                  {findNewEmployee(element) ? (
                    <Badge variant="warning">New Hiring</Badge>
                  ) : (
                    ""
                  )}
                </p>
              </Col>
            );
          })}
        </Row>
      );
      return (
        <>
          {item.subordinates.length !== 0 &&(
            <Row>
              <Col key={index}>
                <p className="staff-name">{item.lider[sheetHeader[1]]}</p>
                <p className="staff-area">
                  {item.lider["Area"]} / {item.lider["Subarea"]}
                </p>
                <p className="staff-area">{item.lider[sheetHeader[4]]}</p>
                <p className="staff-area">{item.lider[sheetHeader[9]]}</p>
                <p className="staff-badge-pay">
                  {findSalaryRaise(item.lider) ? (
                    <Badge variant="success">Pay Rise</Badge>
                  ) : (
                    ""
                  )}
                </p>
                <p className="staff-badge-hire">
                  {findNewEmployee(item.lider) ? (
                    <Badge variant="warning">New Hiring</Badge>
                  ) : (
                    ""
                  )}
                </p>
              </Col>
            </Row>
          )}

          {subordinates}
        </>
      );
    });
    setStaffCard(
      <div data-testid="chart-container">
        <h3 className="title">Salaries paid this month: {calculateSalary()}</h3>
        {allCardsStaff}
      </div>
    );
  };

  const calculateSalary = () => {
    var sum = 0;
    staff.forEach((item) => {
      sum += item[sheetHeader[4]];
    });
    return sum;
  };

  const findSalaryRaise = (personInfo) => {
    let isSalaryRaised = false;
    let groupedByID = _.chain(sheetData)
      .groupBy("ID")
      .map((value, key) => ({
        value: value,
      }))
      .value();
    groupedByID.forEach((item) => {
      if (item.value[0][sheetHeader[1]] === personInfo[sheetHeader[1]]) {
        for (let i = 0; i < item.value.length; i++) {
          if (
            monthSelected ===
            moment(item.value[i][sheetHeader[0]]).format("MM-YYYY")
          ) {
            if (
              item.value[i + 1] !== undefined &&
              item.value[i][sheetHeader[4]] > item.value[i + 1][sheetHeader[4]]
            ) {
              isSalaryRaised = true;
            } else {
              isSalaryRaised = false;
            }
          }
        }
      }
    });
    return isSalaryRaised;
  };

  const findNewEmployee = (personInfo) => {
    let isNewEmployee = false;
    let groupedByID = _.chain(sheetData)
      .groupBy("ID")
      .map((value, key) => ({
        value: value,
      }))
      .value();
    groupedByID.forEach((item) => {
      if (item.value[0][sheetHeader[1]] === personInfo[sheetHeader[1]]) {
        for (let i = 0; i < item.value.length; i++) {
          if (
            monthSelected ===
            moment(item.value[i][sheetHeader[3]]).format("MM-YYYY")
          ) {
            isNewEmployee = true;
          } else {
            isNewEmployee = false;
          }
        }
      }
    });
    return isNewEmployee;
  };

  return staffCard;
};

export default Chart;
