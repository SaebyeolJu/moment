import React from "react";
import axios from "axios";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

import { RxMagnifyingGlass } from "react-icons/rx";
import { AiOutlineComment, AiFillEdit } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";

interface FrameIconBoxProps {
  isClicked: boolean;
  onDelete: () => void;
  _id: string;
}

const FrameIconBox: React.FC<FrameIconBoxProps> = ({
  isClicked,
  _id,
  onDelete,
}) => {
  const handleMagnifyingClick = () => {
    console.log("Magnifying glass clicked");
  };

  const handleEditClick = () => {
    console.log("Edit clicked");
  };

  const handleCommentClick = () => {
    console.log("Comment clicked");
  };

  const handleDeleteClick = async (frameId: string) => {
    try {
      console.log(frameId);
      const res = await axios.delete(
        `http://localhost:5000/api/frames/${frameId}`
      );
      const deletedFrameId = frameId;
      console.log(`Frame with id ${deletedFrameId} is deleted`);
      onDelete();
    } catch (error) {
      console.error(error);
    }
  };

  const Btns = [
    {
      icon: <RxMagnifyingGlass />,
      onClick: handleMagnifyingClick,
      tooltip: "View",
    },
    {
      icon: <AiFillEdit />,
      onClick: handleEditClick,
      tooltip: "Edit",
    },
    {
      icon: <AiOutlineComment />,
      onClick: handleCommentClick,
      tooltip: "Comment",
    },
    {
      icon: <BsFillTrashFill />,
      onClick: () => handleDeleteClick(_id), // Update this line
      tooltip: "Delete",
    },
  ];

  return (
    <div
      className={`frame--icon-container flex justify-evenly align-middle p-2 mt-1 w-48 text-gray-800 shadow-md rounded-md md:text-xl text-md transition-all
    ${isClicked ? "opacity-100" : "opacity-0"}
      }`}
    >
      {Btns.map((btn, index) => (
        <button
          key={index}
          className={`${
            index % 2 ? "bg-yellow-600" : "bg-amber-400"
          } flex justify-center align-middle hover:scale-110 p-2 rounded-full text-white transition-all cursor-pointer`}
          onClick={btn.onClick}
          data-tooltip-content={btn.tooltip}
          data-tooltip-id="frame-tooltip"
          data-tooltip-place="bottom"
        >
          {btn.icon}
        </button>
      ))}
      <Tooltip id="frame-tooltip" />
    </div>
  );
};

export default FrameIconBox;
