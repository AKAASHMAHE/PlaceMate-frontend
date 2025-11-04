import React from "react";
import "../App.css"; // keep same theme
import { PlacementCharts } from "../assets/graphs1"; // ✅ import charts component

function STAT() {
  const stats = [
    { year: 2021, studentsPlaced: 5200, companiesVisited: 450 },
    { year: 2022, studentsPlaced: 5700, companiesVisited: 480 },
    { year: 2023, studentsPlaced: 6000, companiesVisited: 510 },
    { year: 2024, studentsPlaced: 6400, companiesVisited: 530 },
  ];

  return (
    <div className="App-header">
      {/* Title */}
      <h1 className="App-link" style={{ marginBottom: "20px", fontSize: "2rem" }}>
        📊 Placement Statistics
      </h1>

      {/* Description */}
      <p style={{ color: "#bbb", marginBottom: "30px", fontSize: "16px" }}>
        A brief overview of placement trends in recent years.
      </p>

      {/* Table Section */}
      <table
        style={{
          borderCollapse: "collapse",
          width: "70%",
          textAlign: "center",
          color: "white",
          backgroundColor: "#1f2229",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 0 15px rgba(97, 218, 251, 0.2)",
        }}
      >
        <thead style={{ backgroundColor: "#333" }}>
          <tr>
            <th style={{ padding: "15px", borderBottom: "2px solid #61dafb", color: "#61dafb" }}>
              Year
            </th>
            <th style={{ padding: "15px", borderBottom: "2px solid #61dafb", color: "#61dafb" }}>
              Students Placed
            </th>
            <th style={{ padding: "15px", borderBottom: "2px solid #61dafb", color: "#61dafb" }}>
              Companies Visited
            </th>
          </tr>
        </thead>
        <tbody>
          {stats.map((row, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#2c3039" : "#252831",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#353945")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  index % 2 === 0 ? "#2c3039" : "#252831")
              }
            >
              <td style={{ padding: "12px", fontSize: "17px" }}>{row.year}</td>
              <td style={{ padding: "12px", fontSize: "17px" }}>
                {row.studentsPlaced.toLocaleString()}
              </td>
              <td style={{ padding: "12px", fontSize: "17px" }}>
                {row.companiesVisited.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Charts Section */}
      <div
        style={{
          width: "90%",
          maxWidth: "1000px",
          marginTop: "50px",
          padding: "30px",
          backgroundColor: "#1b1f27",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(97, 218, 251, 0.15)",
        }}
      >
        <PlacementCharts /> {/* ✅ imported component */}
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: "40px",
          color: "#61dafb",
          fontSize: "14px",
          opacity: 0.8,
        }}
      >
        *Data Source: VIT Career Development Centre (Demo)
      </p>
    </div>
  );
}

export default STAT;