import { useState } from "react";

import Frame from "../../components/Frame/Frame";

import { useFrameContext } from "../../context/FrameContext";

/**
 *
 * @returns
 */
const FrameList = () => {
  const { frames } = useFrameContext();

  const [currentPage, setCurrentPage] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <section className="flex flex-wrap items-center justify-center h-full w-full snap-mandatory snap-x">
      {frames.map((frame, index) => {
        return (
          <Frame
            isClicked={false}
            isActivated={true}
            frame={frame}
            key={index}
          />
        );
      })}
    </section>
  );
};

export default FrameList;
