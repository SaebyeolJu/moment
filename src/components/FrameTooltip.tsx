import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";

interface FrameTooltipProps {
  likes: string;
  comments: string;
  isClicked: boolean;
  isHovered: boolean;
}

const FrameTooltip: React.FC<FrameTooltipProps> = ({
  likes,
  comments,
  isClicked,
  isHovered,
}) => {
  return (
    <div
      className={`frame--tooltip flex first-letter:flex justify-evenly align-middle space-x-6 w-48 bg-white text-gray-800 shadow-md rounded-md p-2 mb-3 transition-all
    ${isClicked ? "opacity-100" : "opacity-0"}
    ${isHovered ? "opacity-100" : "opacity-0"}
    `}
    >
      <div className="frame--likes flex space-x-2 text-md font-medium items-center cursor-pointer">
        <AiFillHeart />
        <p>{likes}</p>
      </div>
      <div className="frame--comments flex space-x-2 text-md font-medium items-center cursor-pointer">
        <FaCommentDots />
        <p>{comments}</p>
      </div>
    </div>
  );
};

export default FrameTooltip;
