import React from "react";

/**
 *
 * @returns - MD 사이즈일때 LandingFrame을 반환합니다. Frame 4장이 delay를 주어서 나타납니다.
 */
const LandingFrameMd = () => {
  return (
    <div className="group flex cursor-pointer w-full justify-center items-center space-x-10">
      <div className="textWatch delay-150 border hover:scale-110 md:w-64 min-w-56 aspect-[5/7] bg-white transition-all duration-300	drop-shadow-xl"></div>
      <div className="textWatch delay-200 border hover:scale-110 md:w-64 min-w-56 aspect-[5/7] bg-red-200 transition-all duration-300	drop-shadow-xl"></div>
      <div className="textWatch delay-200 border hover:scale-110 md:w-64 min-w-56 aspect-[5/7] bg-slate-600 transition-all duration-300 drop-shadow-xl"></div>
      <div className="textWatch delay-300 border hover:scale-110 md:w-64 min-w-56 aspect-[5/7] bg-red-500 transition-all duration-300	drop-shadow-xl"></div>
    </div>
  );
};

export default LandingFrameMd;
