import React, { useState } from "react";

import { FiTriangle } from "react-icons/fi";

import { FrameInputProps } from "../../../types/FrameProps";

const FrameForm = ({ onSubmit, onPrevStep, onNextStep }: FrameInputProps) => {
  const [frameType, setFrameType] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({ frameType: frameType.toString() });
    onNextStep();
  };

  const prevFrameType = () => {
    if (frameType === 1) {
      return setFrameType(4);
    }
    setFrameType(frameType - 1);
  };

  const nextFrameType = () => {
    if (frameType >= 4) {
      return setFrameType(1);
    }
    setFrameType(frameType + 1);
  };

  return (
    <form
      className="my-auto flex flex-col justify-center text-center space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        액자를 골라주세요
      </h2>
      <div className="flex justify-center items-center space-x-4">
        <button
          type="button"
          className="w-9 h-9 rounded-full border dark:bg-red-500 border-red-500 flex items-center justify-center hover:bg-red-400 hover:text-white transition-colors duration-150"
          onClick={prevFrameType}
        >
          <FiTriangle className="-rotate-90" />
        </button>
        <div
          className={`frame--outline w-64 md:w-72 flex flex-col justify-center text-center items-center align-middle overflow-hidden p-8 transition-all duration-300
        `}
          style={{
            backgroundImage: `url(../img/frames/frame_${frameType}.svg)`,
          }}
        >
          <div className="frame--img h-60 flex shadow-inner bg-slate-200 w-full p-6 border-t-8 border-l-4 border-1 border-slate-400/80 "></div>
        </div>

        <button
          type="button"
          className="w-9 h-9 rounded-full dark:bg-red-500 border border-red-500 flex items-center justify-center hover:bg-red-400 hover:text-white transition-colors duration-150 cursor-pointer"
          onClick={nextFrameType}
        >
          <FiTriangle className="rotate-90" />
        </button>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          type="submit"
          className="rounded-lg px-4 py-2 bg-slate-300 text-slate-800 hover:bg-slate-400 transition-colors duration-150"
          onClick={() => onPrevStep()}
        >
          이전
        </button>
        <button
          type="submit"
          className="rounded-lg px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors duration-150"
        >
          다음
        </button>
      </div>
    </form>
  );
};

export default FrameForm;
