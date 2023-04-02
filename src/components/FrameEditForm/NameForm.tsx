import React, { useState } from "react";
import { FrameProps } from "../../types/FrameProps";

interface NameFormProps {
  onSubmit: (data: Partial<FrameProps>) => void;
  onNextStep: () => void;
}

const NameForm = ({ onSubmit, onNextStep }: NameFormProps) => {
  const [frameInfo, setFrameInfo] = useState<FrameProps>({
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!frameInfo.frame.name) {
      alert("이름을 입력해주세요");
      return;
    }
    onSubmit({ frame: { ...frameInfo.frame, name: frameInfo.frame.name } });
    onNextStep();
  };

  return (
    <form
      className="my-auto flex flex-col justify-center text-center"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold">어떤 이벤트였나요?</h2>
      <input
        type="text"
        value={frameInfo.frame.name}
        className="text-center border border-gray-300 rounded-lg p-2"
        onChange={(e) =>
          setFrameInfo((prevState) => ({
            ...prevState,
            frame: { ...prevState.frame, name: e.target.value },
          }))
        }
      />
      <p className="text-sm text-gray-500">이름을 적어주세요</p>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg p-2 mt-6"
      >
        다음
      </button>
    </form>
  );
};

export default NameForm;
