import React from "react";

/**
 *
 * @returns - Sm 사이즈일때의 Landing Frame들을 반환합니다. 한장으로 겹쳐져있다가 펼쳐지는 형태입니다.
 * @description - 움직이는 애니메이션 때문에 Md와는 달리 부모 컨테이너는 relative, 자식 컨테이너는 absolute로 설정해야합니다.
 */
const LandingFrameSm = () => {
  return (
    <div className="group relative flex justify-center items-center cursor-pointer w-full h-full ">
      <div className="absolute border w-1/2 aspect-[5/7] group-hover:-rotate-12 group-hover:-translate-x-40 bg-white transition-all drop-shadow-xl"></div>
      <div className="absolute border w-1/2 aspect-[5/7] group-hover:-rotate-3 group-hover:-translate-x-12 bg-red-200 transition-all drop-shadow-xl"></div>
      <div className="absolute border w-1/2 aspect-[5/7] group-hover:rotate-6 group-hover:translate-x-14  bg-slate-600 transition-all drop-shadow-xl"></div>
      <div className="absolute border w-1/2 aspect-[5/7] group-hover:rotate-[14deg] group-hover:translate-x-40 bg-red-500 transition-all drop-shadow-xl"></div>
    </div>
  );
};

export default LandingFrameSm;
