import React from "react";

function SelectableChart({ columns, selectedColumns, onColumnSelect, array }) {
  const handleCheckboxChange = (columnName) => {
    onColumnSelect(columnName);
  };

  const numericalColumns = columns.filter((columnName) => {
    // Check if at least one value in the column is numerical
    return array
      .map((row) => parseFloat(row[columnName]))
      .some((value) => !isNaN(value));
  });

  console.log("columns", columns);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Select Columns to plot:
      </label>
      <div className="flex flex-wrap justify-between m-5">
        {numericalColumns.map((columnName) => (
          <div key={columnName} className="mr-4 mb-2">
            <input
              type="checkbox"
              id={columnName}
              checked={selectedColumns.includes(columnName)}
              onChange={() => handleCheckboxChange(columnName)}
              className="mr-2"
            />
            <label htmlFor={columnName} className="text-sm">
              {columnName}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectableChart;
