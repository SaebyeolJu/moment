import React from "react";
import { BsPlusLg } from "react-icons/bs";

const BtnAddFrame = () => {
  return (
    <button className="fixed right-0 hover:bg-red-700 bottom-20 md:bottom-0 bg-red-500 cursor-pointer transition ease-in duration-200 p-4 m-6 mr-10 rounded-full">
      <BsPlusLg className="w-6 h-6 min-w-min text-white" />
    </button>
  );
};

export default BtnAddFrame;
