import * as XLSX from "xlsx";
import React from "react";
import { useState } from "react";
import EditableTable from "./TableDetails";
import "./style.css";

const ExcelToJson = () => {
  const [show,setShow] = useState(false)
  const [data, setData] = useState([]);
 

  const readFile = () => {
    var f = "";
    const reader = new FileReader();
    reader.onload = (evt) => {
     
    };
    setShow(true)
    reader.readAsBinaryString(f);
  };

  
  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const sheetData = XLSX.utils.sheet_to_json(worksheet);
      setData(sheetData)
    };
    reader.readAsArrayBuffer(file);
  };
  
  return (
    <div>
      <div className="container">
      <input type="file" onChange={(e) => handleFile(e.target.files[0])} />       
      <button onClick={readFile}>Read File</button>
      </div>
      <div className="container">   
       {show &&  <EditableTable data={data}/>}      
      </div>
    </div>
  );
};

export default ExcelToJson;
