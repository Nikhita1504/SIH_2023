import React, { useState, useEffect } from "react";
import "./TableComponent.css"; // Linking the CSS file

const TableComponent = ({ data }) => {
  // Assuming the first row determines the table headers
  if (!data || data.length === 0) {
    return null; // Return null when no data is available
  }

  // Extracting unique machine names
  const machines = Array.from(new Set(data.map((row) => row.machine)));

  const [filterRange, setFilterRange] = useState(""); // State for selected filter range
  const [filterOptionsVisible, setFilterOptionsVisible] = useState(false); // State for filter options visibility

  // Function to handle filtering based on load range
  const handleFilter = (range) => {
    setFilterRange(range);
    setFilterOptionsVisible(false); // Hide filter options after selecting a range
  };

  // Filter the data based on the selected range
  const filteredData = data.filter((row) => {
    if (filterRange === "10000-10200") {
      return row.load >= 10000 && row.load <= 10200;
    } else if (filterRange === "10200-10400") {
      return row.load >= 10200 && row.load <= 10400;
    } else if (filterRange === "10400-10600") {
      return row.load >= 10400 && row.load <= 10600;
    } else if (filterRange === "10600-12000") {
      return row.load >= 10600 && row.load <= 12000;
    } else if (filterRange === "greater-than-20000") {
      return row.load > 20000;
    } else {
      return true; // Show all data when no filter range is selected
    }
  });

  // Assuming the first row determines the table headers
  const headers = Object.keys(data[0]);

  useEffect(() => {
    // Display alert and highlight rows where load exceeds 20000
    data.forEach((row) => {
      if (row.load > 20000) {
        alert(`Alert: Load exceeds 20000 for ${row.machine}!`);
        const tableRow = document.getElementById(`row-${row.machine}`);
        if (tableRow) {
          tableRow.classList.add("highlight");
        }
      }
    });
  }, [data]); // Run this effect whenever the data changes

  return (
    <div>
      <button className="filter-button" onClick={() => setFilterOptionsVisible(!filterOptionsVisible)}>Filter</button>
      {filterOptionsVisible && (
        <div className="filter-options">
          <button onClick={() => handleFilter("10000-10200")}>10000-10200</button>
          <button onClick={() => handleFilter("10200-10400")}>10200-10400</button>
          <button onClick={() => handleFilter("10400-10600")}>10400-10600</button>
          <button onClick={() => handleFilter("10600-12000")}>10600-12000</button>
          <button onClick={() => handleFilter("greater-than-20000")}>Greater than 20000</button>
          <button onClick={() => handleFilter("")}>Show All</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index} id={`row-${row.machine}`}>
              {headers.map((header) => (
                <td key={`${header}-${index}`}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
