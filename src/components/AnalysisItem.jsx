import React from "react";

function AnalysisItem({ analysis }) {
  const renderValue = (value) => {
    if (value !== undefined && value !== null) {
      const numericValue =
        typeof value === "string" ? parseFloat(value) : value;
      return isNaN(numericValue) ? "N/A" : numericValue.toFixed(2);
    }
    return "N/A";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mx-4 my-6 text-center">
      <h2 className="text-xl font-semibold mb-8">
        {analysis.mainAnalysis?.fileName
          ? `${analysis.mainAnalysis.fileName} - `
          : "N/A"}
        {analysis.mainAnalysis?.selectedColumn}
        {" & "}
        {analysis.mainAnalysis?.secondSelectedColumn}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">Selected Column:</p>
          <p>{analysis.mainAnalysis?.selectedColumn}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">Second Selected Column:</p>
          <p>{analysis.mainAnalysis?.secondSelectedColumn}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">Mean:</p>
          <p>{renderValue(analysis.mainAnalysis?.mean)}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">Standard Deviation:</p>
          <p>{renderValue(analysis.mainAnalysis?.stdDev)}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">Standard Error:</p>
          <p>{renderValue(analysis.mainAnalysis?.stdError)}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">CV:</p>
          <p>{renderValue(analysis.mainAnalysis?.cv) + "%"}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">Correlation:</p>
          <p>{renderValue(analysis.mainAnalysis?.correlation)}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">P-Value:</p>
          <p>{renderValue(analysis.mainAnalysis?.pValue)}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold">F-Value:</p>
          <p>{renderValue(analysis.mainAnalysis?.fValue)}</p>
        </div>
      </div>

      {/* Render Row Analysis Data */}
      {analysis.rowAnalysis && analysis.rowAnalysis.length > 0 && (
        <div className="">
          <h3 className="text-lg font-semibold sm:mt-10 text-center">
            Row Analysis Data
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {analysis.rowAnalysis.map((row, index) => (
              <div
                key={index}
                className="mt-4 p-4 border border-gray-300 rounded-lg"
              >
                <div className="text-center mb-4">
                  <p className="font-semibold">Selected Row:</p>
                  <p>{row.selectedRow}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="font-semibold">Mean:</p>
                    <p>{renderValue(row.mean)}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Median:</p>
                    <p>{renderValue(row.median)}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Standard Deviation:</p>
                    <p>{renderValue(row.stdDev)}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Standard Error:</p>
                    <p>{renderValue(row.stdError)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {analysis.mainAnalysis && analysis.mainAnalysis.chartImage && (
        <div className="mt-14">
          <img
            src={analysis.mainAnalysis.chartImage}
            alt="Chart"
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}

export default AnalysisItem;
