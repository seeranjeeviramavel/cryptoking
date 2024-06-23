import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ data }) => {
  const [chartData, setChartData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (data.prices) {
      data.prices.forEach((price) => {
        dataCopy.push([new Date(price[0]).toLocaleDateString().slice(0, -1), price[1]]);
      });
      setChartData(dataCopy);
    }
  }, [data]);

  return (
    <div>
      <Chart
        chartType="LineChart"
        height="100%"
        data={chartData}
        legendToggle
      />
    </div>
  );
};

export default LineChart;
