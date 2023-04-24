import React from "react";

const STEPS_METADATA = [
  {
    title: "Complete the Test",
    description:
      "Be yourself and answer honestly to find out your personality type",
    bg: "#edc3c2",
  },
  {
    title: "View Detailed Results",
    description:
      "Learn how your strengths, weaknesses, and interests can help you find the perfect career",
    bg: "#fdf6ec",
  },
  {
    title: "Start your Career Today",
    description: "Follow the steps to get started on your new career path",
    bg: "#e7f8f2",
  },
];

export default function Steps({}) {
  return (
    <div className="flex items-center sm:gap-8 gap-4 mx-4 mt-10 grid sm:grid-cols-3 grid-cols-1">
      {STEPS_METADATA.map((step, i) => {
        return (
          <div
            key={step.title}
            style={{ backgroundColor: `${step.bg}` }}
            className={`relative text-left sm:text-center block rounded-sm p-4 shadow-xl sm:p-6 lg:p-8 sm:h-80 md:h-64 lg:h-48`}
          >
            <h3 className="text-lg sm:text-2xl">
              {i + 1}. {step.title}
            </h3>

            <p className="text-sm sm:text-lg sm:mt-4 mt-2 text-gray-500">
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
