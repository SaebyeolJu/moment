import React from "react";
import FrameList from "./FrameList";
import BtnAddFrame from "../../components/BtnAddFrame";

// import BtnPagination from "../components/BtnPagination";

const FrameContainer = () => {
  return (
    <>
      <div className="flex fixed w-full top-0 dark:text-white right-1/2 transform -translate-x-1/2">
        {/* 글자 안보이는거 해결해야함 */}
        {/* <p className="fixed block w-full dark:text-white inset-y-[10%] bottom-0 md:left-1/2 left-1/2 right-1/2 text-2xl md:text-3xl"> */}
        <p className="md:text-7xl text-xl">열정의 순간들을 간직하세요</p>
      </div>
      {/* <BtnPagination btnType="prev" onPageChange={handlePageChange} /> */}
      {/* <BtnPagination btnType="next" onPageChange={handlePageChange} /> */}
      <FrameList />
      <BtnAddFrame />
    </>
  );
};

export default FrameContainer;
