import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Confetti from "react-confetti";
import { v4 as uuidv4 } from "uuid";

import { FrameProps } from "../../../types/FrameProps";

type FinalFormProps = {
  frameInfo: FrameProps;
  onPrevStep: () => void;
};

const FinalForm = ({ frameInfo, onPrevStep }: FinalFormProps) => {
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const skipFields = [
      "frameId",
      "comments",
      "caption",
      "tags",
      "likes",
      "photoUrl",
    ];

    // Check if any field in frameInfo is empty
    const emptyFields = Object.entries(frameInfo.frame).reduce<string[]>(
      (acc, [key, value]) => {
        if (
          !skipFields.includes(key) &&
          (value === "" ||
            value === null ||
            (Array.isArray(value) && value.length === 0))
        ) {
          acc.push(key);
        }
        return acc;
      },
      []
    );

    if (emptyFields.length > 0) {
      const message = `다음 필드가 비어있습니다: ${emptyFields.join(
        ", "
      )}. 필드를 확인하고 다시 시도해주세요.`;
      alert(message);
      return;
    }

    postFrame(frameInfo);
  };

  const postFrame = async (frameInfo: FrameProps) => {
    try {
      const formData = new FormData();

      formData.append("medalUrl", frameInfo.frame.medalUrl);

      if (
        frameInfo.frame.photoUrls &&
        frameInfo.frame.photoUrls instanceof FormData
      ) {
        // @ts-ignore
        formData.append("photoUrls", frameInfo.frame.photoUrls);
      }

      const Frame = {
        ...frameInfo.frame,
        frameId: uuidv4(),
      };

      const excludedFields = ["comments", "likes", "tags"];
      console.log(Frame);

      Object.entries(Frame).forEach(([key, value]) => {
        if (
          !excludedFields.includes(key) &&
          (typeof value === "string" || value instanceof Blob)
        ) {
          formData.append(key, value);
        }
      });

      const res = await axios.post(
        "http://localhost:5000/api/frames/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        console.log("데이터 업로드 성공");
        setSaved(true);
      }
    } catch (error) {
      console.error("데이터 업로드 실패:", error);
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
    <form className="my-auto flex flex-col justify-center text-center space-y-4">
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
          className={`frame--outline hover:scale-105 hover:-translate-y-1 w-64 md:w-72 flex flex-col justify-center text-center items-center align-middle overflow-hidden p-8 cursor-pointer transition-all duration-400 shadow-xl

      `}
          style={{
            backgroundImage: `url(../img/frames/frame_${frameInfo.frame.frameType}.svg)`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="frame--img flex shadow-inner bg-slate-200 w-full p-6 border-t-8 border-l-4 border-1 border-slate-400/80">
            <div className="frame--content flex flex-col justify-center items-center p-3 drop-shadow-md bg-white">
              {
                // @ts-ignore
                <img
                  src={URL.createObjectURL(frameInfo.frame.medalUrl as Blob)}
                  alt="medal image"
                  className={`frame-medal w-full m-2 mb-6 drop-shadow-xl transition-all duration-1000`}
                />
              }
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
                  {frameInfo.frame.date}
                </h2>
              </div>
            </div>
          </div>
        </article>
        {!saved ? (
          <p className="mt-4 text-md text-gray-500">잘못된 정보는 없나요?</p>
        ) : (
          <p className="mt-4 text-md text-gray-500">완성</p>
        )}
      </div>

      <div className="flex justify-center space-x-4">
        {!saved && (
          <button
            type="submit"
            className="rounded-lg px-4 py-2 bg-slate-300 text-slate-800 hover:bg-slate-400 transition-colors duration-150"
            onClick={() => onPrevStep()}
          >
            돌아가기
          </button>
        )}

        <button
          type="submit"
          className="rounded-lg px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors duration-150"
          onClick={handleSave}
        >
          저장
        </button>

        <button
          type="submit"
          className="rounded-lg px-4 py-2 bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-150"
          onClick={() => navigate("/dashboard")}
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default FinalForm;
