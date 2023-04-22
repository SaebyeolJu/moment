import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state: authState, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/auth/login/success",
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": "true",
            },
          }
        );
        if (res.status === 200) {
          const resLoginObject = res.data;
          if (resLoginObject.success) {
            dispatch({
              type: "LOGIN",
              payload: {
                loginMethod: "google",
                token: resLoginObject.token,
                user: {
                  userId: resLoginObject.user.userId,
                  username: resLoginObject.user.username,
                },
              },
            });
          }
        } else {
          throw new Error("authentication has been failed!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="flex w-full min-h-screen overflow-scroll">
      <Navbar isOpen={isOpen} handleIsOpen={handleIsOpen} />
      {/* 배경화면 수정해야함 메인 */}

      <main
        className={`flex flex-col justify-center text-center items-center dark:bg-slate-900 dark:text-white md:pb-0 pb-20 transition-all duration-700 place-items-center justify-items-center align-middle
        `}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
