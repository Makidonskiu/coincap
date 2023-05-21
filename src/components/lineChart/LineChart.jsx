import React, { useEffect, useRef, useState  } from "react";
import axios from "axios";
import { Chart } from "chart.js/auto";
import "chartjs-adapter-date-fns";



export const LineChart = () => {
  const idStorage = JSON.parse(localStorage.getItem('idStorage'));
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(apiKey+`/${id}/history?interval=d1`);
        const coinData = response.data.data;

        const dates = [];
        const prices = [];

        coinData.forEach((entry) => {
          dates.push(entry.date);
          prices.push(parseFloat(entry.priceUsd));
        });

        // if (chartRef.current) {
        //   // chartRef.current.destroy();
        //   console.log(chartRef.current.destroy);
        // }

        const ctx = chartRef.current.getContext("2d");

        const newChartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: dates,
            datasets: [
              {
                label: `${idStorage} Price`,
                data: prices,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                  displayFormats: {
                    day: "MMM dd",
                  },
                },
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Price (USD)",
                },
              },
            },
          },
        });

        setChartInstance(newChartInstance);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(idStorage);
  }, [idStorage]);

  return <canvas ref={chartRef} />;
};
