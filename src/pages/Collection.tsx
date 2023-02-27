import React, { useState } from "react";

import Navbar from "../components/Navbar";
import FrameList from "../containers/FrameList";
import BtnAddFrame from "../components/BtnAddFrame";
import BtnPagination from "../components/BtnPagination";

const Collection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex w-full min-h-screen overflow-scroll">
      <Navbar isOpen={isOpen} handleIsOpen={handleIsOpen} />
      {/* 배경화면 수정해야함 메인 */}

      <main
        className={`flex flex-col justify-center text-center items-center dark:bg-slate-900 p-7 md:pl-20 pb-24 md:pb-0 transition-all duration-700 place-items-center justify-items-center align-middle ${
          isOpen ? `-[calc(100%-4rem)]` : `md:w-[calc(100% - 4rem)]`
        }`}
      >
        <div className="flex fixed w-full top-0 dark:text-white right-1/2 transform -translate-x-1/2">
          {/* <p className="fixed block w-full dark:text-white inset-y-[10%] bottom-0 md:left-1/2 left-1/2 right-1/2 text-2xl md:text-3xl"> */}
          <p className="md:text-7xl text-xl">열정의 순간들을 간직하세요</p>
        </div>
        {/* <BtnPagination btnType="prev" onPageChange={handlePageChange} /> */}
        {/* <BtnPagination btnType="next" onPageChange={handlePageChange} /> */}
        <FrameList />
        <BtnAddFrame />
      </main>
    </div>
  );
};

export default Collection;
