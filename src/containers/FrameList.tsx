import React, { useState } from "react";
import FrameInfo from "../assets/data/FrameInfo.json";
import Frame from "../components/Frame";

// 사용자가 선택한 frame 종류에 따라서 svg 파일을 다르게 가져온다.

const FrameList = () => {
  const frames = FrameInfo;
  const [currentPage, setCurrentPage] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <section className="flex flex-wrap items-center h-full w-full snap-mandatory snap-x">
      {frames.map((frame, index) => {
        return <Frame isClicked={false} frame={frame} key={index} />;
      })}
    </section>
  );
};

export default FrameList;
