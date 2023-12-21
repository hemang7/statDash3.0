import React, { useState, useRef } from "react";
import * as ss from "simple-statistics";
import * as jStat from "jstat";
import * as XLSX from "xlsx";
import FileInput from "./FileInput";
import TableDisplay from "./TableDisplay";
import RowAnalysis from "./RowAnalysis";
import ChartTypeSelect from "./ChartTypeSelect";
import { UserAuth } from "../context/AuthContext";
import ChartComponent from "./ChartComponent";
import ColumnAnalysis from "./ColumnAnalysis";
import DownloadReportButton from "./DownloadReportButton";
import DownloadAnalysisButton from "./DownloadAnalysisButton";
import SelectableChart from "./SelectableChart";
import Footer from "./Footer";

function Main() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [error, setError] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [secondSelectedColumn, setSecondSelectedColumn] = useState("");
  const [mean, setMean] = useState(null);
  const [stdDev, setStdDev] = useState(null);
  const [stdError, setStdError] = useState(null);
  const [cv, setCV] = useState(null);
  const [correlation, setCorrelation] = useState(null);
  const [pValue, setPValue] = useState(null);
  const [fValue, setFValue] = useState(null);
  const [analysisData, setAnalysisData] = useState([]);
  const [xAxisTitle, setXAxisTitle] = useState("Data Points");
  const [yAxisTitle, setYAxisTitle] = useState("Frequency");
  const [selectedChartType, setSelectedChartType] = useState("line");
  const rowAnalysisRef = useRef();
  const chartRef = useRef();
  const [selectedAnalyses, setSelectedAnalyses] = useState({
    Mean: false,
    StdDev: false,
    StdError: false,
    CV: false,
    Correlation: false,
    PValue: false,
    FValue: false,
  });
  const [selectedNumericalColumns, setSelectedNumericalColumns] = useState([]);

  const { user } = UserAuth();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const updateAnalysisData = (data) => {
    setAnalysisData(data);
  };

  const handleChartTypeChange = (chartType) => {
    setSelectedChartType(chartType);
  };

  const handleCheckboxChange = (label) => {
    setSelectedAnalyses((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      // Convert the CSV string to an array
      csvFileToArray(csv);
    };
    reader.readAsBinaryString(file);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const newArray = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(newArray);
  };

  const calculateMean = (column) => {
    const values = array
      .map((item) => parseFloat(item[column]))
      .filter((value) => !isNaN(value));
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };

  const calculateStdDev = (column) => {
    const values = array
      .map((item) => parseFloat(item[column]))
      .filter((value) => !isNaN(value));
    return ss.standardDeviation(values);
  };

  const calculateStdError = (column) => {
    const values = array
      .map((item) => parseFloat(item[column]))
      .filter((value) => !isNaN(value));
    const stdDeviation = ss.standardDeviation(values);
    const sampleSize = values.length;

    if (sampleSize > 1) {
      const standardError = stdDeviation / Math.sqrt(sampleSize);
      return standardError;
    } else {
      return null;
    }
  };

  const calculateCV = (column) => {
    const meanValue = calculateMean(column);
    const stdDeviation = calculateStdDev(column);

    if (meanValue !== 0) {
      const cvValue = (stdDeviation / meanValue) * 100;
      return cvValue;
    } else {
      return null;
    }
  };

  const calculateCorrelation = (column1, column2) => {
    const values1 = array
      .map((item) => parseFloat(item[column1]))
      .filter((value) => !isNaN(value));

    const values2 = array
      .map((item) => parseFloat(item[column2]))
      .filter((value) => !isNaN(value));

    if (values1.length !== values2.length || values1.length < 2) {
      return null;
    }

    return ss.sampleCorrelation(values1, values2);
  };

  const calculatePValue = (correlation, sampleSize) => {
    if (sampleSize < 3) {
      return null;
    }

    const tStat =
      (correlation * Math.sqrt(sampleSize - 2)) /
      Math.sqrt(1 - correlation ** 2);
    const degreesOfFreedom = sampleSize - 2;
    const pValue =
      2 * (1 - jStat.studentt.cdf(Math.abs(tStat), degreesOfFreedom));
    return pValue;
  };

  const calculateFValue = (column1, column2) => {
    const values1 = array
      .map((item) => parseFloat(item[column1]))
      .filter((value) => !isNaN(value));

    const values2 = array
      .map((item) => parseFloat(item[column2]))
      .filter((value) => !isNaN(value));

    if (values1.length < 2 || values2.length < 2) {
      return null;
    }

    const variance1 = ss.variance(values1);
    const variance2 = ss.variance(values2);

    const fValue = variance1 / variance2;

    return fValue;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      setSelectedColumn("");
      setSecondSelectedColumn("");
      setMean(null);
      setStdDev(null);
      setStdError(null);
      setCV(null);
      setCorrelation(null);
      setPValue(null);
      setFValue(null);

      if (file.name.endsWith(".csv")) {
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
          const text = event.target.result;
          csvFileToArray(text);
        };
        fileReader.readAsText(file);
      } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        readFile(file);
      } else {
        setError(
          "Unsupported file format. Please select a .csv, .xlsx, or .xls file."
        );
      }
    } else {
      setError("Please select a file.");
    }
  };

  const handleColumnSelectChange = (e) => {
    setSelectedColumn(e.target.value);
    if (e.target.value) {
      const columnMean = calculateMean(e.target.value);
      const columnStdDev = calculateStdDev(e.target.value);
      const columnStdError = calculateStdError(e.target.value);
      const columnCV = calculateCV(e.target.value);

      setMean(columnMean);
      setStdDev(columnStdDev);
      setStdError(columnStdError);
      setCV(columnCV);
    } else {
      setMean(null);
      setStdDev(null);
      setStdError(null);
      setCV(null);
    }
  };

  const handleSecondColumnSelectChange = (e) => {
    setSecondSelectedColumn(e.target.value);
    if (e.target.value) {
      const columnCorrelation = calculateCorrelation(
        selectedColumn,
        e.target.value
      );
      const sampleSize = array.length;

      setCorrelation(columnCorrelation);
      const pValue = calculatePValue(columnCorrelation, sampleSize);
      setPValue(pValue);

      const fVal = calculateFValue(selectedColumn, e.target.value);
      setFValue(fVal);
    } else {
      setCorrelation(null);
      setPValue(null);
      setFValue(null);
    }
  };

  const headerKeys = Object.keys(array.length > 0 ? array[0] : {});

  const datePattern = /^(\d{1,2}[-/]\d{1,2}[-/]\d{4})$/; // Updated pattern

  const selectableColumns = headerKeys.filter((key) =>
    array.some((item) => {
      const value = item[key];
      return (
        !isNaN(parseFloat(value)) && value !== "" && !datePattern.test(value)
      );
    })
  );

  return (
    <div>
      <div className="container mx-auto p-5 mt-14">
        <p className="sm:text-lg sm:mb-5 mb-8 text-white text-center flex items-center justify-between">
          <span className="bg-blue-900 p-1 rounded">
            Hi, {user.displayName}!
          </span>
        </p>
        <div className="md:flex md:items-center md:justify-center">
          <form className="flex flex-col items-center md:flex-row">
            <FileInput onChange={handleOnChange} />
            <button
              className="bg-blue-600 text-white py-2 px-3 ml-2 mt-2 md:ml-3 md:mt-0  rounded hover:bg-blue-700 block"
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              IMPORT FILE
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <p className="text-gray-500 mt-3 text-sm text-center">
          Large datasets may take a while to load, please be patient.
        </p>
        <TableDisplay array={array} headerKeys={headerKeys} />
        <div className="mt-10">
          {
            <RowAnalysis
              rowData={array}
              headerKeys={headerKeys}
              rowAnalysisRef={rowAnalysisRef}
              updateAnalysisData={updateAnalysisData}
            />
          }

          {
            <ColumnAnalysis
              selectableColumns={selectableColumns}
              onSelectChange={handleColumnSelectChange}
              selectedColumn={selectedColumn}
              secondSelectedColumn={secondSelectedColumn}
              onSecondSelectChange={handleSecondColumnSelectChange}
              mean={mean}
              stdDev={stdDev}
              stdError={stdError}
              cv={cv}
              correlation={correlation}
              pValue={pValue}
              fValue={fValue}
              selectedAnalyses={selectedAnalyses}
              handleCheckboxChange={handleCheckboxChange}
            />
          }
          {array.length > 0 && (
            <div className="mt-5">
              <ChartTypeSelect
                selectedChartType={selectedChartType}
                onChartTypeChange={handleChartTypeChange}
              />
              <div className="text-center sm:mt-8 mx-auto sm:mx-0 sm:text-left">
                <div className="flex justify-center items-center sm:gap-10">
                  <div className="flex flex-col">
                    <label
                      htmlFor="xAxisTitle"
                      className="block text-sm text-center font-medium text-gray-700 mb-1"
                    >
                      X-Axis Label:
                    </label>
                    <input
                      type="text"
                      id="xAxisTitle"
                      name="xAxisTitle"
                      className="mt-1 p-2 border rounded-md"
                      value={xAxisTitle}
                      onChange={(e) => setXAxisTitle(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="yAxisTitle"
                      className="block text-sm text-center font-medium text-gray-700 mb-1"
                    >
                      Y-Axis Label:
                    </label>
                    <input
                      type="text"
                      id="yAxisTitle"
                      name="yAxisTitle"
                      className="mt-1 p-2 border rounded-md "
                      value={yAxisTitle}
                      onChange={(e) => setYAxisTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {array.length > 0 && (
            <div className="mt-10">
              <SelectableChart
                columns={selectableColumns}
                array={array}
                selectedColumns={selectedNumericalColumns}
                onColumnSelect={(columnName) => {
                  // Toggle the selected column
                  setSelectedNumericalColumns((prevColumns) =>
                    prevColumns.includes(columnName)
                      ? prevColumns.filter((col) => col !== columnName)
                      : [...prevColumns, columnName]
                  );
                }}
              />
            </div>
          )}
          <div className="sm:mt-14 border">
            {array.length > 0 && (
              <ChartComponent
                array={array}
                selectedNumericalColumns={selectedNumericalColumns}
                selectedColumn={selectedColumn}
                secondSelectedColumn={secondSelectedColumn}
                chartRef={chartRef}
                xAxisTitle={xAxisTitle}
                yAxisTitle={yAxisTitle}
                selectedChartType={selectedChartType}
              />
            )}
          </div>
          <div className="sm:mt-10 flex justify-center">
            {selectedColumn && (
              <DownloadReportButton
                chartRef={chartRef}
                user={user}
                selectedColumn={selectedColumn}
                mean={mean}
                stdDev={stdDev}
                stdError={stdError}
                cv={cv}
                secondSelectedColumn={secondSelectedColumn}
                correlation={correlation}
                pValue={pValue}
                fValue={fValue}
                array={array}
                file={file}
                analysisData={analysisData}
                selectedAnalyses={selectedAnalyses}
                handleCheckboxChange={handleCheckboxChange}
              />
            )}
          </div>
        </div>
      </div>
      <Footer
        onFeedbackClick={() => console.log("Feedback button clicked")}
        user={user}
      />
    </div>
  );
}

export default Main;
