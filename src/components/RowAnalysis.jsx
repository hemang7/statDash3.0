import React, { useState, useEffect } from "react";

function RowAnalysis({
  rowData,
  headerKeys,
  rowAnalysisRef,
  updateAnalysisData,
}) {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);

  const handleColumnSelectChange = (e) => {
    const selectedColumn = e.target.value;
    setSelectedColumn(selectedColumn);
    setSelectedRows([]);
  };

  const handleRowCheckboxChange = (e) => {
    const rowValue = e.target.value;
    if (e.target.checked) {
      setSelectedRows((prevRows) => [...prevRows, rowValue]);
    } else {
      setSelectedRows((prevRows) => prevRows.filter((row) => row !== rowValue));
    }
  };

  useEffect(() => {
    if (selectedRows.length > 0) {
      const selectedData = selectedRows.map((selectedRow) => {
        return rowData
          .filter((item) => item[selectedColumn] === selectedRow)
          .map((item) => {
            return Object.values(item)
              .filter((value) => !isNaN(parseFloat(value)))
              .map((value) => parseFloat(value));
          });
      });
      console.log(selectedData);
      setSelectedRowsData(selectedData);
    } else {
      setSelectedRowsData([]);
    }
  }, [selectedRows, rowData, selectedColumn]);

  useEffect(() => {
    if (selectedRows.length > 0) {
      const analysisData = selectedRowsData.map((data, index) => {
        // Calculate analysis data here
        const allValues = data.reduce((acc, values) => [...acc, ...values], []);
        const values = allValues.filter((value) => !isNaN(value));
        const columnMean =
          values.reduce((sum, value) => sum + value, 0) / values.length;
        const columnStdDev = Math.sqrt(
          values.reduce((sum, value) => sum + (value - columnMean) ** 2, 0) /
            (values.length - 1)
        );
        const columnStdError = columnStdDev / Math.sqrt(values.length);

        
        


        return {
          selectedRow: selectedRows[index],
          mean: columnMean,
          stdDev: columnStdDev,
          stdError: columnStdError,
        
        };
      });
      updateAnalysisData(analysisData);
      console.log(analysisData);
    } else {
      // No rows selected
      updateAnalysisData([]);
    }
  }, [selectedRows, selectedRowsData]);

  return (
    <div className="mt-6 p-4 border rounded" ref={rowAnalysisRef}>
      <h2 className="text-lg font-semibold mb-2">Row Analysis</h2>
      <div className="mb-2">
        <label
          htmlFor="columnSelect"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Select a Column:
        </label>
        <select
          id="columnSelect"
          name="columnSelect"
          value={selectedColumn}
          onChange={handleColumnSelectChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a Column</option>
          {headerKeys?.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      {selectedColumn && (
        <div className="mb-2">
          <label
            htmlFor="rowSelect"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Select Rows:
          </label>
          <div className="overflow-y-auto max-h-40 border rounded p-2">
            <div className="grid grid-cols-2 gap-4">
              {Array.from(new Set(rowData.map((item) => item[selectedColumn]))) // Use Set to get unique values
                .filter((item) => item) // Filter out falsy values
                .map((item, index) => (
                  <label key={`${selectedColumn}-${index}`} className="block">
                    <input
                      type="checkbox"
                      value={item}
                      checked={selectedRows.includes(item)}
                      onChange={handleRowCheckboxChange}
                      className="mr-2 leading-tight"
                    />
                    {item}
                  </label>
                ))}
            </div>
          </div>
        </div>
      )}
      <div className="py-3">
        {selectedRowsData.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {selectedRowsData.map((data, index) => (
              <RowAnalysisResult
                key={index}
                data={data}
                name={selectedRows[index]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RowAnalysisResult({ data, name }) {
  if (data.length > 0) {
    const allValues = data.reduce((acc, values) => [...acc, ...values], []);
    const values = allValues.filter((value) => !isNaN(value));
    const columnMean =
      values.reduce((sum, value) => sum + value, 0) / values.length;
    const columnStdDev = Math.sqrt(
      values.reduce((sum, value) => sum + (value - columnMean) ** 2, 0) /
        (values.length - 1)
    );
    const columnStdError = columnStdDev / Math.sqrt(values.length);
    

    return (
      <div>
        <div className="py-1 mt-2">
          <strong>Selected Row:</strong> <span className="text-lg">{name}</span>
        </div>
        <div className="py-1">
          <strong>Mean:</strong> {columnMean.toFixed(2)}
        </div>
     
        <div className="py-1">
          <strong>Standard Deviation:</strong> {columnStdDev.toFixed(2)}
        </div>
        <div className="py-1">
          <strong>Standard Error:</strong> {columnStdError.toFixed(2)}
        </div>
      </div>
    );
  } else {
    return <p>No numerical data available for this row.</p>;
  }
}

export default RowAnalysis;
