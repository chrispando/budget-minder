import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const GanttChart = ({ data }) => {
  // Extract the keys (except "payPeriod") dynamically from the first entry of the data
  console.log("GanttChart data", data);
  const expenseKeys =
    data.length > 0
      ? Object.keys(data[0]).filter((key) => key !== "payPeriod")
      : [];

  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="payPeriod" />
      <YAxis />
      <Tooltip />
      {/* Dynamically render a Bar for each expense category */}
      {expenseKeys.map((key, index) => (
        <Bar key={key} dataKey={key} stackId="a" fill={getColor(index)} />
      ))}
    </BarChart>
  );
};

// Utility function to generate colors for each bar
const getColor = (index) => {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d0ed57"];
  return colors[index % colors.length];
};

export default GanttChart;
