import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";

export const HistoricalDataChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
      const fetchChartData = async () => {
        const response = await fetch(
          "https://api.coincap.io/v2/assets/bitcoin/history"
        );
        const data = await response.json();
        const chartData = {
          labels: data?.data?.map((dayData) => dayData.date),
          datasets: [
            {
              label: "Price (USD)",
              data: data?.data?.map((dayData) => dayData.priceUsd),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        };
        setChartData(chartData);
      };
      fetchChartData();
    }, []);
  
    return (
      <div>
        <h2>Historical Price Data for Bitcoin</h2>
        <Line data={chartData} />
      </div>
    );
}
