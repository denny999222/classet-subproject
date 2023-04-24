import React from "react";

import { CareerScore } from "@/models/types";

interface QuizResultsProps {
  careers: CareerScore[];
}

export default function QuizResults({ careers }: QuizResultsProps) {
  return (
    <div className="mb-32">
      <h2 className="text-2xl font-bold tracking-wider font-mono mt-20">
        These careers best match your profile
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4 gap-2 mt-10">
        {careers.map((career: CareerScore, i: number) => {
          return (
            <div
              className="justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
              key={career.career_id}
            >
              <p className="font-bold text-2xl">{i + 1}</p>
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl mb-6">
                {career.career_name}
              </h3>
              <span className="rounded-full bg-warning px-3 py-1.5 text-xs font-medium text-white">
                {career.score}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
