import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import logo from "../logo.png";

function DownloadReportButton({
  chartRef,
  user,
  selectedColumn,
  mean,
  stdDev,
  stdError,
  cv,
  secondSelectedColumn,
  correlation,
  pValue,
  fValue,
  array,
  analysisData,
  file,
  selectedAnalyses,
  handleCheckboxChange,
}) {
  const userId = user.uid;

  const handleDownloadPdf = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    let verticalPosition = 50;

    let watermarkVerticalPosition = 8;

    // Watermark image
    const watermarkImageWidth = 15; // Adjust the width as needed
    const watermarkImageHeight = 15; // Adjust the height as needed

    const addWatermark = () => {
      doc.addImage(
        logo,
        "PNG",
        (pageWidth - watermarkImageWidth) / 6,
        watermarkVerticalPosition,
        watermarkImageWidth,
        watermarkImageHeight
      );
      doc.setFontSize(9); // Set the font size for email, phone, and address
      doc.text(
        "quarkcs0702@gmail.com, +91 7878308980",
        77,
        watermarkVerticalPosition + 16
      );
      doc.text(
        "8/28, Kuri Bhagtasni, Jodhpur, Rajasthan, India 342013",
        67,
        watermarkVerticalPosition + 21
      );
    };
    doc.setFontSize(24);
    const nameText = "Quark Characterization Services";
    const textWidth = doc.getStringUnitWidth(nameText) * 10; // Adjust font size (10) as needed
    const textX = (pageWidth - textWidth) / 2 + 17;
    const textY = 18;
    doc.text(nameText, textX, textY);

    const addNewPage = () => {
      doc.addPage();
      verticalPosition = margin;
    };

    // Start by adding the watermark
    addWatermark();

    // Format the date and time as a string (adjust the format as needed)
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const titleText = "Statistical Analysis Report";
    const titleTextWidth =
      (doc.getStringUnitWidth(titleText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const titleX = (pageWidth - titleTextWidth) / 2 - 15;

    // Add the title
    doc.setFontSize(16);
    doc.text(titleText, titleX, verticalPosition - 5);
    verticalPosition += 13;

    // Add report information
    doc.setFontSize(12);
    doc.text(`Report by: ${user.displayName}`, margin, verticalPosition);
    verticalPosition += 10;

    // Add the main statistics
    doc.text(`Selected Column: ${selectedColumn}`, margin, verticalPosition);
    verticalPosition += 10;
    if (selectedAnalyses.Mean) {
      doc.text(
        `Mean: ${mean !== null ? mean.toFixed(2) : "N/A"}`,
        margin,
        verticalPosition
      );
      verticalPosition += 10;
    }
    if (selectedAnalyses.StdDev) {
      doc.text(
        `Standard Deviation: ${stdDev !== null ? stdDev.toFixed(2) : "N/A"}`,
        margin,
        verticalPosition
      );
      verticalPosition += 10;
    }

    if (selectedAnalyses.StdError) {
      doc.text(
        `Standard Error: ${stdError !== null ? stdError.toFixed(2) : "N/A"}`,
        margin,
        verticalPosition
      );
      verticalPosition += 10;
    }
    if (selectedAnalyses.CV) {
      doc.text(
        `CV: ${cv !== null ? cv.toFixed(2) + "%" : "N/A"}`,
        margin,
        verticalPosition
      );
      verticalPosition += 10;
    }
    if (secondSelectedColumn) {
      doc.text(
        `Second Selected Column: ${secondSelectedColumn}`,
        margin,
        verticalPosition
      );
      verticalPosition += 10;
    }
    if (selectedAnalyses.Correlation) {
      doc.text(
        `Correlation between ${selectedColumn} and ${secondSelectedColumn} : ${
          correlation !== null ? correlation.toFixed(4) : "N/A"
        }`,
        margin,
        verticalPosition
      );
      verticalPosition += 10;
    }
    if (selectedAnalyses.PValue) {
      doc.text(
        `P-Value: ${pValue !== null ? pValue.toFixed(4) : "N/A"}`,
        margin,
        verticalPosition
      );
      verticalPosition += 10;
    }
    if (selectedAnalyses.FValue) {
      doc.text(
        `F-Value: ${fValue !== null ? fValue.toFixed(4) : "N/A"}`,
        margin,
        verticalPosition
      );
      verticalPosition += 15;
    }

    // Assuming you have a ref for your LineChart component
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current, {
        scale: 2,
      });

      var chartImage = canvas.toDataURL("image/png");

      // Calculate the aspect ratio to fit the chart in the PDF page
      const chartWidth = canvas.width;
      const chartHeight = canvas.height;
      // const maxWidth = doc.internal.pageSize.getWidth() - 20;
      const maxHeight = doc.internal.pageSize.getHeight() - 50;
      const aspectRatio = chartWidth / chartHeight;

      let newWidth = 250;
      let newHeight = newWidth / aspectRatio;
      let chartVerticalPosition = 170;

      // If the graph height exceeds the maximum height, adjust it
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
      }

      const marginLeft = (pageWidth - newWidth) / 2;
      const marginTop = chartVerticalPosition; // Adjust the vertical position to add chart

      doc.addImage(
        chartImage,
        "PNG",
        marginLeft,
        marginTop,
        newWidth,
        newHeight
      );
    }

    // Add Date and Time of Report Generation at the bottom
    doc.setFontSize(10);
    doc.text(
      `Date and Time of Report Generation: ${formattedDate}`,
      margin,
      pageHeight - margin
    );

    // Move to the next page before adding row analysis data

    if (analysisData.length > 0) {
      addNewPage();
      verticalPosition += 5;
      const rowAnalysisTitle = "Row Analysis Data";
      doc.setFontSize(16);
      doc.text(rowAnalysisTitle, margin, verticalPosition);
      verticalPosition += 15;

      analysisData.forEach((data) => {
        if (data) {
          doc.setFontSize(12);

          // Selected Row
          doc.text(
            `Selected Row: ${
              data.selectedRow != null ? data.selectedRow : "N/A"
            }`,
            margin,
            verticalPosition
          );
          verticalPosition += 9;

          // Mean
          doc.text(
            `Mean: ${data.mean != null ? data.mean.toFixed(2) : "N/A"}`,
            margin,
            verticalPosition
          );
          verticalPosition += 7;

          // Standard Deviation
          doc.text(
            `Standard Deviation: ${
              data.stdDev != null ? data.stdDev.toFixed(2) : "N/A"
            }`,
            margin,
            verticalPosition
          );
          verticalPosition += 7;

          // Standard Error
          doc.text(
            `Standard Error: ${
              data.stdError != null ? data.stdError.toFixed(2) : "N/A"
            }`,
            margin,
            verticalPosition
          );
          verticalPosition += 18; // Adjust the spacing as needed

          if (verticalPosition > pageHeight - margin - 50) {
            addNewPage();
          }
        }
      });
    }

    // Save the PDF
    const fileName = file.name.replace(/\.[^/.]+$/, "");
    doc.save(`${fileName}_statistics.pdf`);

    const combinedAnalysisData = {
      mainAnalysis: {
        selectedColumn,
        mean,
        stdDev,
        stdError,
        cv,
        secondSelectedColumn,
        correlation,
        pValue,
        fValue,
        chartImage: chartImage,
        fileName,
        formattedDate, // Optionally, include the formatted date
      },
      rowAnalysis: analysisData.map((data) => ({
        selectedRow: data.selectedRow !== null ? data.selectedRow : "N/A",
        mean: data.mean !== null ? data.mean.toFixed(2) : "N/A",
        stdDev: data.stdDev !== null ? data.stdDev.toFixed(2) : "N/A",
        stdError: data.stdError !== null ? data.stdError.toFixed(2) : "N/A",
      })),
    };

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(combinedAnalysisData),
    };

    console.log(userId);
    const res = await fetch(
      `https://statdash-73260-default-rtdb.firebaseio.com/users/${userId}/analysis.json`,
      options
    );

    if (res) {
      console.log("Message sent");
      console.log(res.data);
    } else {
      console.log("Error occurred");
    }
  };

  return (
    <button
      className="bg-green-500 text-white py-2 px-3 ml-2 sm:mt-4 mb-3 rounded hover:bg-green-700 block"
      onClick={handleDownloadPdf}
    >
      Download Report
    </button>
  );
}

export default DownloadReportButton;
