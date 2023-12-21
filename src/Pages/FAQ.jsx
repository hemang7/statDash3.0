// FAQ.js

import React from "react";

const faqs = [
  {
    question: "What is Data Analysis?",
    answer:
      "Data analysis is the process of inspecting, cleaning, transforming, and modeling data to discover useful information, draw conclusions, and support decision-making.",
  },
  {
    question: "What Is a Histogram?",
    answer:
      "A histogram is a graphical representation of the distribution of a dataset. It shows the frequency or probability of different values in a continuous or discrete variable.",
  },
  {
    question: "How Do You Calculate Correlation?",
    answer:
      "Correlation measures the strength and direction of a linear relationship between two variables. The most common method is Pearson correlation coefficient, which ranges from -1 to 1.",
  },
  {
    question: "What Is the p-Value?",
    answer:
      "The p-value in hypothesis testing represents the probability of obtaining results as extreme as the observed results, assuming the null hypothesis is true. A smaller p-value indicates stronger evidence against the null hypothesis.",
  },
  {
    question: "What is the Coefficient of Correlation?",
    answer:
      'The coefficient of correlation, often denoted as "r," measures the strength and direction of the linear relationship between two continuous variables. It ranges from -1 (perfect negative correlation) to 1 (perfect positive correlation), with 0 indicating no linear correlation.',
  },
  {
    question: "How is the F-Value Used in Statistics?",
    answer: `The F-value is primarily used in analysis of variance (ANOVA) and regression analysis. It helps determine whether the means of multiple groups are significantly different. In regression, it's used for testing the overall significance of the model.`,
  },
  {
    question: "What is Standard Error?",
    answer:
      "The standard error measures the accuracy of an estimate. It quantifies the variation or uncertainty in a sample statistic, like the sample mean.",
  },
  {
    question: "What is Standard Deviation?",
    answer:
      "Standard deviation is a measure of the amount of variation or dispersion in a set of values. A low standard deviation indicates that the values tend to be close to the mean, while a high standard deviation indicates that the values are spread out.",
  },
  {
    question: "How is Variance Calculated?",
    answer:
      "Variance is the average of the squared differences from the Mean. It measures how far a set of values is spread out. Variance is the square of the standard deviation.",
  },
  {
    question: "What is a Scatter Plot?",
    answer: `A scatter plot is a graph that displays individual data points on a two-dimensional space. It's often used to explore relationships between two variables.`,
  },
  // Add more FAQs here
];

function FAQ() {
  return (
    <div>
      <div className="container mx-auto p-5">
        <h1
          className="text-4xl font-bold mb-14 text-center"
          style={{ marginTop: "4rem" }}
        >
          Frequently Asked Questions
        </h1>
        <ul>
          {faqs.map((faq, index) => (
            <li key={index} className="mb-6">
              <Question question={faq.question} />
              <Answer answer={faq.answer} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Question({ question }) {
  return <h2 className="text-xl font-medium">{question}</h2>;
}

function Answer({ answer }) {
  return <p className="text-gray-700">{answer}</p>;
}

export default FAQ;
