import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiNightSleep } from "react-icons/gi";
import { MdDoubleArrow } from "react-icons/md";

interface Props {
  isOpen: boolean;
  handleIsOpen: (state: boolean) => void;
}

const Navbar: React.FC<Props> = ({ isOpen, handleIsOpen }) => {
  const navigate = useNavigate();

  const Menus = [
    {
      title: "Home",
      dest: "/collection",
      icon: <AiOutlineHome className="absolute w-7 h-7 min-w-min mx-6" />,
    },
    {
      title: "Profile",
      dest: "/profile",
      icon: <CgProfile className="absolute w-7 h-7 min-w-min mx-6" />,
    },
    {
      title: "Friend",
      dest: "/friends",
      icon: <FaUserFriends className="absolute w-7 h-7 min-w-min mx-6" />,
    },
    {
      title: "logout ",
      dest: "/",
      icon: <FiLogOut className="absolute w-7 h-7 min-w-min mx-6" />,
    },
    {
      title: "Setting ",
      dest: "/setting",
      icon: <AiOutlineSetting className="absolute w-7 h-7 min-w-min mx-6" />,
    },
  ];

  return (
    <nav
      className="md:hover:relative z-10 bottom-0 w-full group fixed md:w-20 md:hover:w-64 md:min-h-screen shadow-md bg-black transition-all duration-700 ease-in"
      onMouseEnter={() => handleIsOpen(true)}
      onMouseLeave={() => handleIsOpen(false)}
    >
      {/* boarder */}
      <ul className="flex flex-row md:flex-col md:h-full items-center p-0 m-0 text-white list-none">
        {/* navbar lists */}

        {/* logo */}
        <li className="hidden w-full h-20 mt-6 lg:flex text-center font-bold justify-center bg-yellow-500">
          <span className="hidden text-2xl tracking-wide m-6 text-gray-700 transition-all duration-700 group-hover:block">
            MOMENT
          </span>
          <MdDoubleArrow className="w-7 h-7 min-w-min m-6 hover:rotate-180 transition-all duration-700" />
        </li>

        {Menus.map((menu, index) => (
          <li
            key={index}
            className="w-full cursor-pointer hover:bg-yellow-500 hover:grayscale-0 grayscale"
            onClick={() => navigate(menu.dest)}
          >
            <a className="flex md:justify-start justify-center items-center h-20">
              {menu.icon}
              <span className="md:ml-24 hidden md:group-hover:block">
                {menu.title}
              </span>
            </a>
          </li>
        ))}
        {/* 
        <li className="flex md:justify-start justify-center mt-auto w-full cursor-pointer hover:bg-yellow-500">
          <GiNightSleep className="md:absolute w-7 h-7 min-w-min m-6 md:bottom-0" />
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
