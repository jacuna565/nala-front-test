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

  const getSubordinates = (subordinates) => {
    return (
      <Row>
        {subordinates.length > 0 ? (
          subordinates.map((element, index) => {
            let lider = (
              <Col key={index} xs={12 / subordinates.length}>
                <p className="staff-name">{element.lider[sheetHeader[1]]}</p>
                <p className="staff-area">
                  {element.lider["Area"]} / {element.lider["Subarea"]}
                </p>
                <p className="staff-area">{element.lider[sheetHeader[4]]}</p>
                <p className="staff-area">{element.lider[sheetHeader[9]]}</p>
                <p className="staff-badge-pay">
                  {findSalaryRaise(element.lider) ? (
                    <Badge variant="success">Pay Rise</Badge>
                  ) : (
                    ""
                  )}
                </p>
                <p className="staff-badge-hire">
                  {findNewEmployee(element.lider) ? (
                    <Badge variant="warning">New Hiring</Badge>
                  ) : (
                    ""
                  )}
                </p>
                {element.subordinates && getSubordinates(element.subordinates)}
              </Col>
            );
            return lider;
          })
        ) : (
          <Col>
            <p className="staff-name">{subordinates.lider[sheetHeader[1]]}</p>
            <p className="staff-area">
              {subordinates.lider["Area"]} / {subordinates.lider["Subarea"]}
            </p>
            <p className="staff-area">{subordinates.lider[sheetHeader[4]]}</p>
            <p className="staff-area">{subordinates.lider[sheetHeader[9]]}</p>
            <p className="staff-badge-pay">
              {findSalaryRaise(subordinates.lider) ? (
                <Badge variant="success">Pay Rise</Badge>
              ) : (
                ""
              )}
            </p>
            <p className="staff-badge-hire">
              {findNewEmployee(subordinates.lider) ? (
                <Badge variant="warning">New Hiring</Badge>
              ) : (
                ""
              )}
            </p>
          </Col>
        )}
      </Row>
    );
  };

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

    let newObjectArray = {};
    let newSubordinates = [];
    let newSubordinates_lvl2 = [];
    data.forEach((item) => {
      item.subordinates.length > 0 &&
        item.subordinates.forEach((element) => {

          data.forEach((el) => {
            if (el.lider[sheetHeader[2]] === element[sheetHeader[2]]) {

              if (_.isEmpty(newObjectArray)) {
                newObjectArray.lider = item.lider;
                newSubordinates.push({
                  lider: el.lider,
                });
                newObjectArray.subordinates = newSubordinates;
              } else {
                if (newObjectArray.lider === item.lider) {
                  newSubordinates.push({
                    lider: el.lider,
                  });
                  newObjectArray.subordinates = newSubordinates;
                } else {
                  newObjectArray.subordinates.forEach((subord, index) => {
                    if (subord.lider === item.lider) {
                      newSubordinates_lvl2.push({
                        lider: el.lider,
                      });
                      subord.subordinates = newSubordinates_lvl2;
                    }
                  });
                }
              }
            }
          });
        });
    });

    let organizationChart = (
      <>
        <Row>
          <Col>
            <p className="staff-name">{newObjectArray.lider[sheetHeader[1]]}</p>
            <p className="staff-area">
              {newObjectArray.lider["Area"]} / {newObjectArray.lider["Subarea"]}
            </p>
            <p className="staff-area">{newObjectArray.lider[sheetHeader[4]]}</p>
            <p className="staff-area">{newObjectArray.lider[sheetHeader[9]]}</p>
            <p className="staff-badge-pay">
              {findSalaryRaise(newObjectArray.lider) ? (
                <Badge variant="success">Pay Rise</Badge>
              ) : (
                ""
              )}
            </p>
            <p className="staff-badge-hire">
              {findNewEmployee(newObjectArray.lider) ? (
                <Badge variant="warning">New Hiring</Badge>
              ) : (
                ""
              )}
            </p>
          </Col>
        </Row>
        {newObjectArray.subordinates &&
          getSubordinates(newObjectArray.subordinates)}
      </>
    );
    setStaffCard(
      <div data-testid="chart-container">
        <h3 className="title">Salaries paid this month: {calculateSalary()}</h3>
        {organizationChart}
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
