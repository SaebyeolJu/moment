import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AiOutlineCheck } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { RxCalendar } from "react-icons/rx";

import { FrameInputProps } from "../../../types/FrameProps";

const DateForm = ({ onSubmit, onPrevStep, onNextStep }: FrameInputProps) => {
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date) {
      alert("날짜를 선택해주세요");
      return;
    }

    if (!location) {
      alert("장소를 입력해주세요");
      return;
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}.${month}.${day}`;

    onSubmit({ date: formattedDate, location });
    onNextStep();
  };

  return (
    <form
      className="h-screen flex flex-col justify-center items-center space-y-5"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold">언제, 어디서 였나요?</h1>
      <img src="../img/gif/sign.gif" alt="photo_gif" className="w-42" />
      <div className="flex flex-col">
        <div className="flex items-center">
          <RxCalendar className="mr-1" />
          <label className="text-md text-gray-500">날짜를 선택해주세요</label>
        </div>

        <DatePicker
          className="text-center border border-gray-300 dark:text-black rounded-lg p-2"
          selected={date}
          onChange={handleDateChange}
          dateFormat="yyyy년 MM월 dd일"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <GrLocation className="mr-1 dark:text-white" />
          <p className="text-md text-gray-500">장소를 적어주세요</p>
        </div>
        <input
          type="text"
          className="text-center border border-gray-300 dark:text-black rounded-lg p-2"
          value={location}
          onChange={handlePlaceChange}
        />
      </div>

      <div className="flex space-x-5">
        <button
          type="submit"
          className="rounded-lg px-4 py-2 mt-6 bg-slate-300 text-slate-800 hover:bg-slate-400 transition-colors duration-150"
          onClick={() => onPrevStep()}
        >
          이전
        </button>
        <button
          type="submit"
          className="rounded-lg px-4 py-2 mt-6 bg-red-500 text-white hover:bg-red-600 transition-colors duration-150"
        >
          다음
        </button>
      </div>
    </form>
  );
};

export default DateForm;
