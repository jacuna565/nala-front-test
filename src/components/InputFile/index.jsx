import React from 'react';
import * as XLSX from "xlsx";
import Form from "react-bootstrap/Form";

const InputFile = ({setData, label}) => {

  const handleInputChange = (event) => {
    let sheets = [];
    let reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onloadend = (e) => {
      var excelData = new Uint8Array(e.target.result);
      var excelBook = XLSX.read(excelData, { type: "array", cellDates: true });

      excelBook.SheetNames.forEach((sheetName) => {
        var excelRowObject = XLSX.utils.sheet_to_json(
          excelBook.Sheets[sheetName]
        );
        sheets.push({
          data: excelRowObject,
          sheetName,
        });
        setData(sheets);
      });
    };
  };

  return(
    <Form.File data-testid="input-container"
      id="label-test"
      label={label}
      custom
      onChange={handleInputChange}
    />
  )
};

export default InputFile;