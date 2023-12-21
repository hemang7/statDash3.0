// UserGuide.js

import React from "react";

function UserGuide() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mt-14 mb-8">User Guide</h1>
      <p className="text-2xl sm:p-5 mb-10">
        Welcome to our QCS Statistics Dashboard! To maximize the utility of your
        data, follow these comprehensive steps.
      </p>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          Step 1: Import Your Data
        </h2>
        <p>
          Initiate the process by clicking the{" "}
          <span className="text-blue-500">"Choose File"</span> button. Select
          your CSV or Excel (xlsx) file, and subsequently click{" "}
          <span className="text-blue-500">"Import File"</span> to seamlessly
          load your data into the system.
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Step 2: Row Analysis</h2>
        <p>
          Following the data import, carefully choose the column intended for
          analysis from the dropdown menu. Employ checkboxes to select the
          specific rows for inclusion in the analysis. Configure the analysis by
          selecting the desired row-level parameters.
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Step 3: Column Analysis</h2>
        <p>
          For column analysis, meticulously select both primary and secondary
          columns from the dropdown menus. Employ checkboxes to designate
          analysis parameters such as mean, stdError, stdDev, CV, etc.
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          Step 4: Choose Chart Type
        </h2>
        <p>
          Opt for the chart type that best aligns with your visualization
          preferences. This can be accomplished through the available options.
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          Step 5: Generate Analysis Report
        </h2>
        <p>
          Conclude the process by clicking the{" "}
          <span className="text-blue-500">"Download Report"</span> button. The
          system will diligently generate a comprehensive analysis report in PDF
          format, encapsulating your selected analyses and insights.
        </p>
      </div>
      <p className="text-gray-600">
        Should you encounter queries or require guidance, please refer to our
        FAQ section or reach out to our dedicated support team. We are committed
        to facilitating your mastery of the data at hand!
      </p>
    </div>
  );
}

export default UserGuide;
