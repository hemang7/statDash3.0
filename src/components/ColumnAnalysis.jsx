import React from "react";

function ColumnAnalysis({
  selectableColumns,
  onSelectChange,
  selectedColumn,
  onSecondSelectChange,
  secondSelectedColumn,
  mean,
  stdDev,
  stdError,
  cv,
  correlation,
  pValue,
  fValue,
  selectedAnalyses,
  handleCheckboxChange,
}) {
  const renderAnalysis = (label, value) => {
    const shouldDisplay = selectedAnalyses[label];

    return (
      shouldDisplay && (
        <div className="p-4 bg-white border rounded-md">
          <p className="font-semibold">
            {label === "Correlation"
              ? `Correlation between ${selectedColumn} and ${secondSelectedColumn}:`
              : label === "PValue"
              ? `P-Value between ${selectedColumn} and ${secondSelectedColumn}:`
              : label === "FValue"
              ? `F-Value between ${selectedColumn} and ${secondSelectedColumn}:`
              : `${label} for ${selectedColumn}:`}
          </p>
          <p>{value !== null ? value.toFixed(2) : "N/A"}</p>
        </div>
      )
    );
  };

  return (
    <div>
      <div className="mt-6 p-4 rounded border">
        <h2 className="text-lg font-semibold mb-2">Column Analysis</h2>
        <div>
          <label
            htmlFor="columnSelect"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select a Column for Analysis:
          </label>
          <select
            id="columnSelect"
            name="columnSelect"
            className="mt-1 p-2 border rounded-md w-full"
            onChange={onSelectChange}
          >
            <option value="">Select a Column</option>
            {selectableColumns.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>

          {/* Second column select */}
          <label
            htmlFor="secondColumnSelect"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Select a Second Column for Correlation:
          </label>
          <select
            id="secondColumnSelect"
            name="secondColumnSelect"
            className="mt-1 p-2 border rounded-md w-full"
            onChange={onSecondSelectChange}
          >
            <option value="">Select a Column</option>
            {selectableColumns.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedColumn && (
        <>
          <div className="sm:mt-8 sm:ml-1">
            <h3 className="text-lg font-semibold mb-2">Analysis Options:</h3>
            <div className="flex flex-wrap gap-4 justify-center sm:mt-8">
              {Object.entries(selectedAnalyses).map(([label, isChecked]) => (
                <div key={label} className="flex items-center">
                  <input
                    type="checkbox"
                    id={label}
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(label)}
                    className="mr-2"
                  />
                  <label htmlFor={label}>{label}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:mt-10 sm:mb-10 text-center">
            {renderAnalysis("selectedColumn", selectedColumn)}
            {renderAnalysis("secondSelectedColumn", secondSelectedColumn)}
            {renderAnalysis("Mean", mean)}
            {renderAnalysis("Correlation", correlation)}
            {renderAnalysis("StdError", stdError)}
            {renderAnalysis("StdDev", stdDev)}
            {renderAnalysis("CV", cv)}
            {renderAnalysis("PValue", pValue)}
            {renderAnalysis("FValue", fValue)}
          </div>
        </>
      )}
    </div>
  );
}

export default ColumnAnalysis;
