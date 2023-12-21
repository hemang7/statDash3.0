import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import ScatterChart from "./ScatterChart";

function ChartComponent({
  array,
  selectedNumericalColumns,
  chartRef,
  xAxisTitle,
  yAxisTitle,
  selectedChartType,
}) {
  let chart = null;

  if (selectedChartType === "line") {
    chart = (
      <LineChart
        array={array}
        selectedNumericalColumns={selectedNumericalColumns}
        chartRef={chartRef}
        xAxisTitle={xAxisTitle}
        yAxisTitle={yAxisTitle}
      />
    );
  } else if (selectedChartType === "bar") {
    chart = (
      <BarChart
        array={array}
        selectedNumericalColumns={selectedNumericalColumns}
        chartRef={chartRef}
        xAxisTitle={xAxisTitle}
        yAxisTitle={yAxisTitle}
      />
    );
  } else if (selectedChartType === "scatter") {
    chart = (
      <ScatterChart
        array={array}
        selectedNumericalColumns={selectedNumericalColumns}
        chartRef={chartRef}
        xAxisTitle={xAxisTitle}
        yAxisTitle={yAxisTitle}
      />
    );
  }

  return <div>{chart}</div>;
}

export default ChartComponent;
