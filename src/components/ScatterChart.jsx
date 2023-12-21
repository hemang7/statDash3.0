import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import "chartjs-plugin-zoom";
import zoomPlugin from "chartjs-plugin-zoom";

function ScatterChart({
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
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
  );

  useEffect(() => {
    if (array.length > 0 && selectedNumericalColumns.length > 0) {
      const labels = array.map((_, index) => `${index + 1}`);

      const datasets = selectedNumericalColumns.map((columnName, index) => {
        const data = array
          .map((item) => parseFloat(item[columnName]))
          .filter((value) => !isNaN(value));

        return {
          label: columnName,
          data: data.map((value, index) => ({ x: index, y: value })),
          borderColor: getRandomColor(),
          borderWidth: 2,
          fill: false,
          pointStyle: getPointStyle(),
          pointRadius: 5, // Adjust the size of the points
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

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getPointStyle = (() => {
    const pointStyles = ["circle", "cross", "crossRot", "rect", "rectRounded"];
    let usedPointStyles = [];

    return () => {
      if (usedPointStyles.length === pointStyles.length) {
        // If all styles have been used, reset the used styles
        usedPointStyles = [];
      }

      // Find the first unused point style
      const unusedStyle = pointStyles.find(
        (style) => !usedPointStyles.includes(style)
      );

      if (unusedStyle) {
        usedPointStyles.push(unusedStyle);
        return unusedStyle;
      }

      // Fallback to a default style if something goes wrong
      return "circle";
    };
  })();

  return (
    <div className="mt-5 bg-white" style={chartContainerStyle} ref={chartRef}>
      {chartData && <Scatter data={chartData} options={options} />}
    </div>
  );
}

export default ScatterChart;
