import React from "react";

interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div
      style={{ width: "80%", marginLeft: "10%" }}
      className="flex items-center h-1 rounded-sm sm:mt-10 mt-16"
    >
      <p className="uppercase font-bold text-gray-400 text-xl mr-4">
        {percentage}%
      </p>
      <div
        style={{ width: `${percentage}%` }}
        className={`bg-warning h-full rounded-sm`}
      />
      <div
        style={{ width: `${100 - percentage}%` }}
        className={`bg-gray-200 h-full rounded-sm`}
      />
    </div>
  );
}
