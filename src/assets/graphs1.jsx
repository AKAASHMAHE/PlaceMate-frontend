import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// ✅ Register all Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// --- 1️⃣ Total Students Placed (Bar Chart) ---
const studentsData = {
  labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
  datasets: [
    {
      label: "Total Students Placed",
      data: [4381, 4914, 5609, 7683, 8993, 7586, 11140],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

// --- 2️⃣ Companies Visited (Bar Chart) ---
const companiesData = {
  labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
  datasets: [
    {
      label: "Companies Visited",
      data: [719, 739, 844, 975, 945, 873, 868],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

// --- 3️⃣ Super Dream Offers (Pie Chart) ---
const superDreamData = {
  labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
  datasets: [
    {
      label: "Super Dream Offers",
      data: [683, 1126, 1176, 3419, 4480, 3369, 3563],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(99, 255, 132, 0.6)",
      ],
      borderColor: "#fff",
      borderWidth: 1,
    },
  ],
};

// --- Common Chart Options ---
const commonOptions = (title) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#fff", // For dark theme
      },
    },
    title: {
      display: true,
      text: title,
      color: "#61dafb",
      font: {
        size: 18,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "#bbb" },
      grid: { color: "rgba(255,255,255,0.1)" },
    },
    y: {
      ticks: { color: "#bbb" },
      grid: { color: "rgba(255,255,255,0.1)" },
    },
  },
});

// --- Main Component ---
export function PlacementCharts() {
  return (
    <div style={{ width: "100%", color: "white", textAlign: "center" }}>
      {/* Total Students Placed */}
      <div
        className="chart-container"
        style={{
          background: "#1f242d",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "40px",
          boxShadow: "0 0 20px rgba(97, 218, 251, 0.15)",
        }}
      >
        <Bar options={commonOptions("Total Students Placed")} data={studentsData} />
      </div>

      {/* Companies Visited */}
      <div
        className="chart-container"
        style={{
          background: "#1f242d",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "40px",
          boxShadow: "0 0 20px rgba(97, 218, 251, 0.15)",
        }}
      >
        <Bar options={commonOptions("Companies Visited")} data={companiesData} />
      </div>

      {/* Super Dream Offers */}
      <div
        className="chart-container"
        style={{
          background: "#1f242d",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "20px",
          boxShadow: "0 0 20px rgba(97, 218, 251, 0.15)",
        }}
      >
        <Pie options={commonOptions("Super Dream Offers")} data={superDreamData} />
      </div>
    </div>
  );
}

export default PlacementCharts;