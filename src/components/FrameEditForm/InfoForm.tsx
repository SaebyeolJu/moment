import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FrameProps, FrameInputProps } from "../../types/FrameProps";

const DateForm = ({ onSubmit, onPrevStep, onNextStep }: FrameInputProps) => {
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [frameInfo, setFrameInfo] = React.useState<FrameProps>({
    frame: {
      id: "",
      name: "",
      medalImg: "",
      coverImg: [],
      title: "",
      caption: "",
      date: new Date(),
      location: "",
      frameType: 0,
      likes: 0,
      comments: 0,
      tags: [],
    },
    isClicked: false,
  });

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

    setFrameInfo((prevState) => ({
      ...prevState,
      frame: {
        ...prevState.frame,
        date: date,
        location: location,
      },
    }));

    onSubmit(frameInfo);
    onNextStep();
  };

  return (
    <form
      className="my-auto flex flex-col justify-center"
      onSubmit={handleSubmit}
    >
      <p className="text-sm text-gray-500">날짜를 선택해주세요</p>
      <DatePicker
        className="border border-gray-300 rounded-lg p-2 mt-2"
        selected={date}
        onChange={handleDateChange}
        dateFormat="yyyy년 MM월 dd일"
      />

      <p className="text-sm text-gray-500">장소를 적어주세요</p>
      <input
        type="text"
        className="text-center border border-gray-300 rounded-lg p-2"
        value={location}
        onChange={handlePlaceChange}
      />
      <div className="flex justify-around">
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg p-2 mt-6"
          onClick={() => onPrevStep()}
        >
          이전
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg p-2 mt-6"
        >
          다음
        </button>
      </div>
    </form>
  );
};

export default DateForm;
