import React, { useState } from "react";
import { FrameInputProps } from "../../../types/FrameProps";

import { AiOutlineCheck } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { RxMagnifyingGlass } from "react-icons/rx";

const TitleForm = ({ onSubmit, onNextStep }: FrameInputProps) => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");

  const [isTitleEmpty, setIsTitleEmpty] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsTitleEmpty(false);
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      setIsTitleEmpty(true);
      return;
    }

    onSubmit({ title, caption });
    onNextStep();
  };

  return (
    <form
      className="my-auto h-1/2 flex flex-col justify-center items-center space-y-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold">어떤 이벤트였나요?</h1>
      <p>소중한 순간을 함께 생각해봅시다</p>
      <img src="../img/gif/photo.gif" alt="photo_gif" />

      <div className="relative">
        <div className="flex">
          <RxMagnifyingGlass className="mr-1" />
          <label htmlFor="nameInput" className="text-md text-gray-500">
            이름을 적어주세요
          </label>
        </div>
        <input
          id="titleInput"
          type="text"
          value={title}
          placeholder="이벤트 이름"
          className="text-center border border-gray-300 rounded-lg p-2 dark:text-black"
          onChange={handleNameChange}
          aria-label="이름 입력"
        />
        {title && (
          <AiOutlineCheck className="absolute right-2 top-1/2 transform -translate-y-1/2 dark:text-black" />
        )}
      </div>
      <div className="relative">
        <div className="flex">
          <BiPencil className="mr-1" />
          <label htmlFor="nameInput" className="text-md text-gray-500">
            이벤트 설명을 간략히 적어주세요
          </label>
        </div>
        <input
          id="captionInput"
          type="text"
          value={caption}
          placeholder="이벤트 설명"
          className="text-center border border-gray-300 rounded-lg p-2 dark:text-black"
          onChange={handleCaptionChange}
          aria-label="이벤트 설명 입력"
        />
        {title && (
          <AiOutlineCheck className="absolute right-2 top-1/2 transform -translate-y-1/2 dark:text-black" />
        )}
      </div>
      {isTitleEmpty && <p className="mt-1 text-red-500">이름을 입력해주세요</p>}
      <button
        type="submit"
        className="rounded-lg px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors duration-150"
      >
        다음
      </button>
    </form>
  );
};

export default TitleForm;
