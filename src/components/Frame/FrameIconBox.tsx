import React from "react";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

import { RxMagnifyingGlass } from "react-icons/rx";
import { AiOutlineComment, AiFillEdit } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";

interface FrameIconBoxProps {
  isClicked: boolean;
  onDelete: () => void;
}

const FrameIconBox: React.FC<FrameIconBoxProps> = ({ isClicked, onDelete }) => {
  const handleMagnifyingClick = () => {
    console.log("Magnifying glass clicked");
  };

  const handleEditClick = () => {
    console.log("Edit clicked");
  };

  const handleCommentClick = () => {
    console.log("Comment clicked");
  };

  const handleDeleteClick = () => {
    console.log("Trash clicked");
  };

  return (
    <div
      className={`frame--icon-container flex justify-evenly align-middle p-2 mt-1 w-48 text-gray-800 shadow-md rounded-md md:text-xl text-md transition-all
    ${isClicked ? "opacity-100" : "opacity-0"}
      }`}
    >
      <button
        className="flex justify-center align-middle hover:scale-110 bg-amber-400 p-2 rounded-full text-white transition-all cursor-pointer"
        onClick={handleMagnifyingClick}
        data-tooltip-content="View"
        data-tooltip-id="frame-tooltip"
        data-tooltip-place="bottom"
      >
        <RxMagnifyingGlass />
      </button>
      <button
        className="flex justify-center align-middle hover:scale-110 bg-yellow-600 p-2 rounded-full text-white transition-all cursor-pointer"
        onClick={handleEditClick}
        data-tooltip-content="Edit"
        data-tooltip-id="frame-tooltip"
        data-tooltip-place="bottom"
      >
        <AiFillEdit />
      </button>
      <button
        className="flex justify-center align-middle hover:scale-110 bg-amber-400 p-2 rounded-full text-white transition-all cursor-pointer"
        onClick={handleCommentClick}
        data-tooltip-content="Comment"
        data-tooltip-id="frame-tooltip"
        data-tooltip-place="bottom"
      >
        <AiOutlineComment />
      </button>
      <button
        className="flex justify-center align-middle hover:scale-110 bg-yellow-600 p-2 rounded-full text-white transition-all cursor-pointer"
        onClick={onDelete}
        data-tooltip-content="Delete"
        data-tooltip-id="frame-tooltip"
        data-tooltip-place="bottom"
      >
        <BsFillTrashFill />
      </button>
      <Tooltip id="frame-tooltip" />
    </div>
  );
};

export default FrameIconBox;
