import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto"; // Import ChartJS from chart.js/auto
import "chartjs-plugin-zoom"; // Import the zoom plugin
import zoomPlugin from "chartjs-plugin-zoom";

function BarChart({
  array,
  selectedNumericalColumns,
  chartRef,
  xAxisTitle,
  yAxisTitle,
}) {
  const [chartData, setChartData] = useState(null);

  // Register the zoom plugin
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
  );

  useEffect(() => {
    if (array.length > 0) {
      const labels = array.map((_, index) => `${index + 1}`);

      const datasets = selectedNumericalColumns.map((columnName) => {
        const data = array
          .map((item) => parseFloat(item[columnName]))
          .filter((value) => !isNaN(value));

        return {
          label: columnName,
          data: data,
          backgroundColor: getRandomColor(),
          borderWidth: 2,
        };
      });

      setChartData({
        labels: labels,
        datasets: datasets,
      });
    }
  }, [array, selectedNumericalColumns]);

  const chartContainerStyle = {
    width: "100%",
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
  };

  const options = {
    scales: {
      x: {
        display: true,
        ticks: {
          font: {
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: xAxisTitle,
          font: {
            weight: "bold",
          },
          ticks: {
            font: {
              weight: "bold",
            },
          },
        },
        grid: {
          display: false,
        },
        border: { display: false },
      },
      y: {
        display: true,
        position: "left",
        title: {
          display: true,
          text: yAxisTitle,
          font: {
            weight: "bold",
          },
          ticks: {
            font: {
              weight: "bold",
            },
          },
        },
        border: { display: false },
        ticks: {
          display: true,
          font: {
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      title: {
        display: false,
        text: "Value Chart",
      },
      legend: {
        display: true,
        position: "top",
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: "x",
          speed: 100,
        },
        pan: {
          enabled: true,
          mode: "x",
          speed: 0.5,
        },
      },
    },
  };

  // Helper function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="mt-5 bg-white" style={chartContainerStyle} ref={chartRef}>
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
}

export default BarChart;
