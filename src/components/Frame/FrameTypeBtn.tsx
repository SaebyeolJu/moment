import React from "react";

import { AiOutlineTag } from "react-icons/ai";
import { TiInfoLargeOutline } from "react-icons/ti";
import { RiMedalLine } from "react-icons/ri";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineFilterFrames } from "react-icons/md";
import { TbConfetti } from "react-icons/tb";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

export const sectionBtn = [
  {
    key: "Title",
    component: <AiOutlineTag className="w-6 h-6 min-w-min" />,
  },
  {
    key: "Info",
    component: <TiInfoLargeOutline className="w-6 h-6 min-w-min" />,
  },
  {
    key: "Medal",
    component: <RiMedalLine className="w-6 h-6 min-w-min" />,
  },
  {
    key: "Photo",
    component: <HiOutlinePhotograph className="w-6 h-6 min-w-min" />,
  },
  {
    key: "Frame",
    component: <MdOutlineFilterFrames className="w-6 h-6 min-w-min" />,
  },
  {
    key: "Final",
    component: <TbConfetti className="w-6 h-6 min-w-min" />,
  },
];

type FrameTypeBtnProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const FrameTypeBtn = ({ setStep }: FrameTypeBtnProps) => {
  // hover하면 불투명
  return (
    <div className="fixed rounded top-5 justify-evenly dark:text-white bg-slate-500 flex py-2 w-3/5 hover:opacity-50 transition-all">
      {sectionBtn.map((section, index) => (
        <button
          key={index}
          onClick={() => setStep(index)}
          data-tooltip-content={section.key}
          data-tooltip-id="form-tooltip"
          data-tooltip-place="bottom"
        >
          <>{section.component}</>
        </button>
      ))}
      <Tooltip id="form-tooltip" />
    </div>
  );
};

export default FrameTypeBtn;
