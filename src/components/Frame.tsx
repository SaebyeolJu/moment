import React, { useState } from "react";

import { GrGallery } from "react-icons/gr";
import { AiOutlineComment } from "react-icons/ai";
import { FaShare } from "react-icons/fa";

import { FrameProps } from "../types/FrameProps";

import FrameTooltip from "./FrameTooltip";
import FrameIconBox from "./FrameIconBox";

const Frame: React.FC<FrameProps> = ({ frame }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <article className="group flex flex-col items-center snap-center">
      <FrameTooltip
        likes={frame.likes}
        comments={frame.comments}
        isClicked={isClicked}
        isHovered={isHovered}
      />
      <div
        className={`frame--outline hover:scale-110 hover:-translate-y-1 w-64 md:w-72 flex flex-col justify-center text-center items-center align-middle overflow-hidden p-8 m-8 cursor-pointer transition-all duration-400
      ${isClicked ? "drop-shadow-xl" : "drop-shadow-2xl"}
      `}
        style={{ backgroundImage: `url(${frame.frame_img})` }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="frame--img flex shadow-inner bg-slate-200 w-full p-6 border-t-8 border-l-4 border-1 border-slate-400/80">
          <div className="frame--content flex flex-col justify-center items-center p-3 drop-shadow-md bg-white">
            <img
              src={frame.medal_img}
              alt={frame.medal_img}
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
              <p className="frame--disc text-sm">{frame.event_date}</p>
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
      <FrameIconBox isClicked={isClicked} />
    </article>
  );
};

export default Frame;
