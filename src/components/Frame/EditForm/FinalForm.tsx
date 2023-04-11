import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Confetti from "react-confetti";
import { v4 as uuidv4 } from "uuid";

import { AuthContext } from "../../../context/AuthContext";
import { FrameProps } from "../../../types/FrameProps";

type FinalFormProps = {
  frameInfo: FrameProps;
  onPrevStep: () => void;
};

const FinalForm = ({ frameInfo, onPrevStep }: FinalFormProps) => {
  const { state: authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const frameId = uuidv4();
      await axios.post("/api/frames", {
        ...frameInfo.frame,
        frameId: frameId,
        userId: authState.user,
      });
      setSaved(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (saved) {
      setShowConfetti(true);
      // use setTimeout to navigate after 5 seconds
      const timeoutId = setTimeout(() => {
        navigate("/dashboard");
      }, 4000);
      // clear the timeout to prevent navigation if the user clicks the button again
      return () => clearTimeout(timeoutId);
    }
  }, [saved, navigate]);

  return (
    <form className="my-auto flex flex-col justify-center text-center">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      {!saved ? (
        <h2 className="text-2xl font-bold">마지막으로 확인해주세요</h2>
      ) : (
        <h2 className="text-2xl font-bold">축하합니다!</h2>
      )}

      <div
        className={`group flex flex-col items-center snap-center duration-300 ease-out`}
      >
        <article
          className={`frame--outline hover:scale-110 hover:-translate-y-1 w-64 md:w-72 flex flex-col justify-center text-center items-center align-middle overflow-hidden p-8 m-8 cursor-pointer transition-all duration-400 shadow-xl

      `}
          style={{
            backgroundImage: `url(../img/frames/frame_${
              frameInfo.frame.frameType + 1
            }.svg)`,
          }}
        >
          <div className="frame--img flex shadow-inner bg-slate-200 w-full p-6 border-t-8 border-l-4 border-1 border-slate-400/80">
            <div className="frame--content flex flex-col justify-center items-center p-3 drop-shadow-md bg-white">
              <img
                src={"../img/temp/m.png"}
                alt={frameInfo.frame.medalUrl}
                className={`frame-medal w-full m-2 mb-6 drop-shadow-xl transition-all duration-1000`}
              />

              <div
                className={`frame--txt border bg-slate-50 border-neutral-400/[.25] mb-2 p-4 drop-shadow-sm `}
              >
                <h1
                  className={`frame--title text-sm md:text-md dark:text-neutral-600 font-semibold text-gray-600 break-keep
                  `}
                >
                  {frameInfo.frame.title}
                </h1>
                <h2
                  className={`frame--title text-sm dark:text-neutral-600 font-semibold text-gray-600`}
                >
                  {frameInfo.frame.date.toLocaleString("ko-KR")}
                </h2>
              </div>
            </div>
          </div>
        </article>
        {!saved ? (
          <p className="text-md text-gray-500">틀린 정보는 없나요?</p>
        ) : (
          <p className="text-md text-gray-500">완성</p>
        )}
      </div>

      <div className="flex justify-center space-x-4">
        {!saved && (
          <button
            type="submit"
            className="rounded-lg px-4 py-2 mt-6 bg-slate-300 text-slate-800 hover:bg-slate-400 transition-colors duration-150"
            onClick={() => onPrevStep()}
          >
            돌아가기
          </button>
        )}

        <button
          type="submit"
          className="rounded-lg px-4 py-2 mt-6 bg-red-500 text-white hover:bg-red-600 transition-colors duration-150"
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </form>
  );
};

export default FinalForm;
