import React from "react";
import { Question_Type } from "@/models/types_db";

const radios = [
  { className: "radio radio-error w-14 h-14", value: 1 },
  { className: "radio radio-error w-10 h-10", value: 2 },
  { className: "radio w-8 h-8", value: 3 },
  { className: "radio radio-success w-10 h-10", value: 4 },
  { className: "radio radio-success w-14 h-14", value: 5 },
];

type QuestionSectionProps = Question_Type & {
  onChange: (value: number) => void;
};

const QuestionSection = ({ id, text, onChange }: QuestionSectionProps) => {
  const [selected, setSelected] = React.useState<number>(0);
  return (
    <div key={id} className="w-full justify-center mt-20">
      <p className="font-mono text-lg sm:text-2xl font-bold text-gray-500 mb-8 mx-4">
        {text}
      </p>
      <div className="flex items-center justify-center sm:gap-x-16">
        <p className="font-mono text-lg text-error hidden sm:block">Disagree</p>
        <div className="flex gap-x-4 items-center sm:gap-x-10">
          {radios.map((item, i) => {
            return (
              <input
                key={i}
                type="radio"
                name={`radio-${id}`}
                className={item.className}
                value={item.value}
                onChange={(e) => {
                  onChange(parseInt(e.target.value));
                  setSelected(parseInt(e.target.value));
                }}
              />
            );
          })}
        </div>
        <p className="font-mono text-lg text-success hidden sm:block">Agree</p>
      </div>

      <div className="font-mono flex items-center justify-between block sm:hidden mx-11 text-sm mt-4">
        <p className="text-error">Disagree</p>
        <p className="text-success">Agree</p>
      </div>

      <div
        style={{ width: "80%", marginLeft: "10%" }}
        className="divider mt-8"
      ></div>
    </div>
  );
};

export default QuestionSection;
