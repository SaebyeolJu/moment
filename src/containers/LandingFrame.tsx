import React, { useEffect, useState } from "react";

import FrameInfo from "../assets/data/FrameInfo.json";
import Frame from "../components/Frame/Frame";

/**
 * @returns A component that renders the frames on the landing page
 */
const LandingFrame = () => {
  const frames = FrameInfo;
  const frameArray = [
    {
      key: "frame_1",
      className: `group-hover:-rotate-12 group-hover:-translate-x-20 md:delay-150`,
    },
    {
      key: "frame_2",
      className: `group-hover:-rotate-3 group-hover:translate-x-0 md:delay-300`,
    },
    {
      key: "frame_3",
      className: `group-hover:rotate-6 group-hover:translate-x-24 md:delay-500`,
    },
  ];

  return (
    <div className="group relative flex justify-evenly items-center cursor-pointer h-full overflow-visible">
      {frameArray.map((frame, index) => (
        <div
          key={frame.key}
          className={`hover:z-20 absolute md:static md:group-hover:rotate-0 md:group-hover:-translate-x-0 textWatch transition-all ${frame.className}`}
        >
          <Frame frame={frames[index]} isActivated={false} />
        </div>
      ))}
    </div>
  );
};

export default LandingFrame;
