import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto"; // Import the chart.js library automatically
import ChartDataLabels from "chartjs-plugin-datalabels"; // Optional, if you want more customization

const PieChart = ({ data, options }) => {
  return (
    <div className="totals">
      <div className="pie-chart-container">
        <h3>Expense Breakdown</h3>
        <div className="pie-chart-wrapper">
          <Pie data={data} options={options} plugins={[ChartDataLabels]} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
