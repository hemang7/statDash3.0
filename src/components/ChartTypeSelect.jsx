import React from "react";
import LineChartIcon from "../line.png"; // Replace with the actual path to your icon/image
import BarChartIcon from "../bar.png"; // Replace with the actual path to your icon/image
import ScatterChartIcon from "../scatter.png"; // Replace with the actual path to your icon/image

function ChartTypeSelect({ onChartTypeChange }) {
  const chartIcons = {
    line: LineChartIcon,
    bar: BarChartIcon,
    scatter: ScatterChartIcon,
  };

  const handleMouseEnter = (chartType) => {
    const icon = document.getElementById(`chart-icon-${chartType}`);
    icon.style.transform = "scale(1.2)";
  };

  const handleMouseLeave = (chartType) => {
    const icon = document.getElementById(`chart-icon-${chartType}`);
    icon.style.transform = "scale(1)";
  };

  return (
    <div>
      <label htmlFor="chartType">Select Chart Type: </label>
      <div className="sm:mt-8 sm:ml-14 sm:mr-14 flex justify-around">
        {Object.keys(chartIcons).map((chartType) => (
          <img
            key={chartType}
            id={`chart-icon-${chartType}`}
            src={chartIcons[chartType]}
            alt={chartType}
            onClick={() => {
              onChartTypeChange(chartType);
            }}
            style={{
              cursor: "pointer",
              width: "32px", // Adjust the size as needed
              height: "32px", // Adjust the size as needed
              transition: "transform 0.2s", // Add a smooth transition effect
            }}
            onMouseEnter={() => handleMouseEnter(chartType)}
            onMouseLeave={() => handleMouseLeave(chartType)}
          />
        ))}
      </div>
    </div>
  );
}

export default ChartTypeSelect;
