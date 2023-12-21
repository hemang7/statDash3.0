import React from "react";
import { saveAs } from "file-saver";

const DownloadAnalysisButton = ({
  array,
  selectedColumn,
  mean,
  stdDev,
  stdError,
  cv,
  secondSelectedColumn,
  correlation,
  pValue,
  fValue,
  analysisData,
  file,
  selectedAnalyses,
}) => {
  const handleDownload = () => {
    // Create a new CSV string with the original data
    const originalCSV = arrayToCSV(array);

    // Combine analysis data into a single string
    const analysisCSV = analysisDataToCSV([
      { label: "selectedColumn", value: selectedColumn },
      { label: "secondSelectedColumn", value: secondSelectedColumn },
      { label: "Mean", value: mean },
      { label: "StdDev", value: stdDev },
      { label: "StdError", value: stdError },
      { label: "CV", value: cv },
      { label: "Correlation", value: correlation },
      { label: "PValue", value: pValue },
      { label: "FValue", value: fValue },
      ...analysisData, // Include both row and column analysis data
    ]);

    // Create a blob with the combined CSV data
    const combinedCSV = originalCSV + "\n\n" + analysisCSV;
    const blob = new Blob([combinedCSV], { type: "text/csv;charset=utf-8" });

    // Save the blob as a file
    saveAs(blob, `${file.name}_analysis.csv`);
  };

  const arrayToCSV = (data) => {
    const csvRows = [];

    // Add header row
    const header = Object.keys(data[0]);
    csvRows.push(header.join(","));

    // Add data rows
    data.forEach((row) => {
      const values = header.map((key) => row[key]);
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };

  const analysisDataToCSV = (data) => {
    const csvRows = [];

    // Extract header and values separately
    const header = data.reduce((acc, row) => {
      if (Array.isArray(row.value)) {
        for (let i = 0; i < row.value.length; i++) {
          acc.push(`${row.label}_${i}`);
        }
      } else {
        acc.push(row.label);
      }
      return acc;
    }, []);

    // Add header row
    csvRows.push(header.join(","));

    // Find the maximum number of rows needed
    const maxRows = Math.max(
      ...data.map((row) => (Array.isArray(row.value) ? row.value.length : 1))
    );

    // Add data rows
    for (let i = 0; i < maxRows; i++) {
      const rowData = data.map((row) => {
        if (Array.isArray(row.value) && row.value[i] !== undefined) {
          return row.value[i];
        } else {
          return row.value;
        }
      });
      csvRows.push(rowData.join(","));
    }

    return csvRows.join("\n");
  };

  return (
    <button
      className="bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600"
      onClick={handleDownload}
      disabled={!selectedColumn || !secondSelectedColumn}
    >
      Download Analysis
    </button>
  );
};

export default DownloadAnalysisButton;
