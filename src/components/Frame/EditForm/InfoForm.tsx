import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AiOutlineCheck } from "react-icons/ai";
import { FaSearchLocation } from "react-icons/fa";
import { RxCalendar } from "react-icons/rx";

import { FrameInputProps } from "../../../types/FrameProps";

const DateForm = ({ onSubmit, onPrevStep, onNextStep }: FrameInputProps) => {
  const [date, setDate] = useState(Date);
  const [isDateEmpty, setIsDateEmpty] = useState(false);

  const [location, setLocation] = useState("");
  const [isLocationEmpty, setIsLocationEmpty] = useState(false);

  const handleDateChange = (date: Date) => {
    const formattedDate = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    setDate(formattedDate);
  };

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date) {
      setIsDateEmpty(true);
      return;
    }

    if (!location) {
      setIsLocationEmpty(true);
      return;
    }

    onSubmit({ date, location });
    onNextStep();
  };

  return (
    <form
      className="flex flex-col justify-center items-center space-y-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold">언제, 어디서 였나요?</h1>
      <img src="../img/gif/sign.gif" alt="photo_gif" className="w-36" />
      <div className="flex flex-col">
        <div className="flex items-center">
          <RxCalendar className="mr-1" />
          <label className="text-md text-gray-500">날짜를 선택해주세요</label>
        </div>

        <DatePicker
          className="text-center border border-gray-300 dark:text-black rounded-lg p-2"
          selected={new Date(date)}
          onChange={handleDateChange}
          dateFormat="yyyy년 MM월 dd일"
        />
        {isDateEmpty && <p className="text-red-500">날짜를 선택해주세요</p>}
      </div>

      <div className="flex flex-col">
        <div className="flex items-center">
          <FaSearchLocation className="mr-1 dark:text-white" />
          <p className="text-md text-gray-500">장소를 적어주세요</p>
        </div>
        <div className="relative">
          <input
            type="text"
            className="text-center border border-gray-300 dark:text-black rounded-lg p-2"
            value={location}
            onChange={handlePlaceChange}
          />
          {location && (
            <AiOutlineCheck className="absolute right-2 top-1/2 transform -translate-y-1/2 dark:text-black" />
          )}
        </div>

        {isLocationEmpty && (
          <p className="mt-1 text-red-500">장소를 입력해주세요</p>
        )}
      </div>

      <div className="flex space-x-5 ">
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

export default DateForm;
