import React, { useState } from "react";
import * as XLSX from "xlsx";
import ChartComponent from "./ChartComponent";
import TableComponent from "./TableComponent";
import "./About.css";

const About = () => {
  const [fileData, setFileData] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [pieValue, setPieValue] = useState("");
  const [chartData, setChartData] = useState(null); // Initialize with null or empty array
  const [tableData, setTableData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setChartData(jsonData);
      setTableData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const displayChart = () => {
    // Check if chartData is available
    if (!chartData) {
      return null; // Return null if chartData is not available
    }

    // Prepare data for chart based on selected chart type and input values
    let chartDataToDisplay = [];

    if (chartType === "pie") {
      const labels = chartData.map((row) => row[pieValue]);
      const values = chartData.map((row) => row[yAxis]);
      chartDataToDisplay = { labels, datasets: [{ data: values }] };
    } else {
      const labels = chartData.map((row) => row[xAxis]);
      const values = chartData.map((row) => row[yAxis]);
      chartDataToDisplay = { labels, datasets: [{ label: yAxis, data: values }] };
    }

    // Return the chart component with the prepared data
    return <ChartComponent type={chartType} data={chartDataToDisplay} />;
  };

  const handleHighlightRows = (fieldName) => {
    // Check if tableData is available and if the fieldName is valid
    if (!tableData || !fieldName) {
      return;
    }

    const highlightedRows = tableData.filter((row) => row[fieldName] > 20000);
    if (highlightedRows.length > 0) {
      // Highlight rows and display alert
      alert(`Load exceeded 20,000 for ${highlightedRows.length} rows in the "${fieldName}" field.`);
    }
  };

  return (
    <div className="about-container">
      <h1>Analyze logs with InsightLog</h1>
      <div className="upload-form">
        <label htmlFor="fileInput" className="upload">Upload Data File:</label>
        <input
          type="file"
          id="fileInput"
          accept=".xlsx,.csv"
          onChange={handleFileUpload}
        />
        <div>
          <label htmlFor="chartType">Select Chart Type:</label>
          <select
            id="chartType"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
        {(chartType === "bar" || chartType === "line") && (
          <div>
            <label htmlFor="xAxis">X-Axis Value:</label>
            <input
              type="text"
              id="xAxis"
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
            />
            <label htmlFor="yAxis" className="yvalue">Y-Axis Value:</label>
            <input
              type="text"
              id="yAxis"
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
            />
          </div>
        )}
        {chartType === "pie" && (
          <div>
            <label htmlFor="pieValue">Pie Value:</label>
            <input
              type="text"
              id="pieValue"
              value={pieValue}
              onChange={(e) => setPieValue(e.target.value)}
            />
          </div>
        )}
        <button className='upload-button' onClick={displayChart}>Display Chart</button> {/* Displaying selected chart */}
      </div>
      <div className="visualization">
        <TableComponent data={tableData} highlightRows={handleHighlightRows} />
        {/* Render the chart component here */}
        {displayChart()}
      </div>
    </div>
  );
};

export default About;
