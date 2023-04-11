import React, { useState, useEffect } from "react";

import { FrameProps } from "../../types/FrameProps";

import FrameTooltip from "./FrameTooltip";
import FrameIconBox from "./FrameIconBox";

const Frame: React.FC<FrameProps> = ({ frame }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDelete = () => {
    setIsDeleted(true);
  };

  useEffect(() => {
    if (!isClicked || isHovered) return;

    const timer = setTimeout(() => {
      setIsClicked(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isClicked, isHovered]);

  return (
    <article
      className={`group dark:text-black flex flex-col items-center snap-center duration-300 ease-out ${
        isDeleted ? "opacity-0 scale-0" : "opacity-100 scale-100"
      }`}
    >
      <FrameTooltip
        likes={frame.likes.totalLikes}
        comments={frame.comments.totalComments}
        isClicked={isClicked}
        isHovered={isHovered}
      />
      <div
        className={`frame--outline hover:scale-110 hover:-translate-y-1 w-64 md:w-72 flex flex-col justify-center text-center items-center align-middle overflow-hidden p-8 m-8 cursor-pointer transition-all duration-400
      ${isClicked ? "drop-shadow-xl" : "drop-shadow-2xl"}
      `}
        style={{
          backgroundImage: `url(./img/frames/frame_${frame.frameType + 1}.svg)`,
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="frame--img flex shadow-inner bg-slate-200 w-full p-6 border-t-8 border-l-4 border-1 border-slate-400/80">
          <div className="frame--content flex flex-col justify-center items-center p-3 drop-shadow-md bg-white">
            <img
              src={frame.medalUrl}
              alt={frame.medalUrl}
              className={`frame-medal w-full m-2 mb-6 drop-shadow-xl transition-all duration-1000`}
            />
            <h1
              className={`frame--title text-sm md:text-md font-semibold text-gray-600
              ${isClicked ? "hidden" : "visible"}`}
            >
              {frame.title}
            </h1>

            <div
              className={`frame--txt border bg-slate-50 border-neutral-400/[.25] mb-2 p-4 drop-shadow-sm ${
                isClicked ? "visible" : "hidden"
              }`}
            >
              <h1
                className={`frame--title text-md md:text-md font-semibold text-gray-600`}
              >
                {frame.title}
              </h1>
            </div>

            <svg
              className={`chevron ${
                !isClicked ? "rotate-180" : ""
              } transition-all duration-700 m-2 mt-5`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 35"
              width="30"
            >
              <path
                d="M5 30L50 5l45 25"
                fill="none"
                stroke="#000"
                strokeWidth="6"
              />
            </svg>
          </div>
        </div>
      </div>
      <FrameIconBox isClicked={isClicked} onDelete={handleDelete} />
    </article>
  );
};

export default Frame;
