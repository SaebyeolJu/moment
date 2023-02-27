import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import LandingFrameSm from "../containers/LandingFrameSm";
import LandingFrameMd from "../containers/LandingFrameMd";

// import { sectionObserver } from "../functions/sectionObserver";

const Landing = () => {
  const navigate = useNavigate();
  const [isSm, setIsSm] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSm(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // IntersectionObserver를 모든 section에 등록

  useEffect(() => {
    // IntersectionObserver를 모든 section에 등록
    const sections = document.querySelectorAll(".textWatch");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // visible
          entry.target.classList.add(
            "opacity-100",
            "blur-none",
            "translate-y-0"
          );
          entry.target.classList.remove(
            "opacity-0",
            "blur-sm",
            "-translate-y-full"
          );
        } else {
          // hidden
          entry.target.classList.add(
            "opacity-0",
            "blur-sm",
            "-translate-y-full"
          );
          entry.target.classList.remove(
            "opacity-100",
            "blur-none",
            "translate-y-0"
          );
        }
      });
    }, options);

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);

  // IntersectionObserver를 모든 section에 등록

  return (
    <div className="w-full h-full overflow-y-scroll	snap-y snap-mandatory">
      <section
        className="snap-start border-[12px] border-white rounded-3xl flex flex-col xl:flex-row xl:justify-center justify-evenly items-center w-full h-full animate-gradient gradient-animation text-white"
        id="section_1"
      >
        <header className="text-box">
          <h1 className="md:text-7xl text-5xl font-bold">Moment</h1>
          <h3>내 열정의 순간들을 소중히 보관하세요</h3>
          <p>러닝 이벤트 기록 서비스 Moment</p>
        </header>
        <div>
          <img
            src="./img/bg/landing.svg"
            alt="bg-img"
            className="grow w-8/12 block mx-auto"
          />

          <div className="flex justify-around mx-auto space-x-6 bg-gradient-to-r p-1 from-[#131a42] to-dark-indigo rounded-md w-9/12 shadow-xl">
            <button
              onClick={() => navigate("/login")}
              className="text-white font-medium bg-darkBrown m-2 p-2 border-2 rounded-md transition-all hover:border-[#732f67]"
            >
              시작 하기
            </button>

            <button
              onClick={() => navigate("/login")}
              className="text-white font-medium bg-darkBrown m-2 p-2 border-2 border-white rounded-md transition-all hover:border-[#732f67]"
            >
              About Us
            </button>
          </div>
        </div>

        <div className="bottom-0 absolute mb-8 text-center flex flex-col justify-center">
          <h1 className="text-xl">Scroll</h1>
          <svg
            className={`chevron rotate-180 w-10 h-10 mx-auto`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 35"
            width="30"
          >
            <path
              d="M5 30L50 5l45 25"
              fill="none"
              stroke="#000"
              strokeWidth="6"
            />
          </svg>
        </div>
      </section>
      <section
        className="snap-start flex flex-col bg-cover bg-no-repeat bg-center border-[12px] border-white rounded-3xl items-center text-center w-full h-full p-10 bg-slate-400"
        id="section_2"
        style={{ backgroundImage: "url('/img/bg/medal_hand.png')" }}
      >
        <div className="transition-all opacity-0 text-white">
          <h1 className="block text-xl md:text-3xl">
            힘겹게 모은 메달들. 관리하기 힘들죠?
          </h1>
          <p>가끔은 좋은 순간을 추억하는데도 노력이 필요합니다.</p>
        </div>
      </section>
      <section
        className="snap-start flex flex-col border-[12px] border-white rounded-3xl justify-center items-center text-center w-full h-full animate-gradient gradient-animation p-10"
        id="section_3"
      >
        <div className="text-white">
          <h1 className="block text-xl md:text-3xl">
            러닝 이벤트를 갤러리 형식으로 보관하세요.
          </h1>
          <p>메달, 러닝 기록, 러닝 사진 등을 한눈에 볼 수 있습니다.</p>
          <p>러닝 이벤트를 기록하고, 기록을 공유하세요.</p>
        </div>
        {isSm ? <LandingFrameSm /> : <LandingFrameMd />}
      </section>
      <section
        className="snap-start border-[12px] border-white bg-cover bg-no-repeat bg-center rounded-3xl flex flex-col justify-center items-center text-center w-full h-full"
        id="section_4"
      >
        <h1 className="text-3xl md:text-4xl block">
          친구와 소중한 순간을 나눠보세요
        </h1>
        <div className="bg-amber-300 w-1/2 h-1/3 rounded-full"></div>
      </section>
      <section
        className="snap-start border-[12px] border-white bg-cover bg-no-repeat bg-center rounded-3xl flex flex-col justify-center items-center text-center w-full h-full bg-[url('/img/bg/finishing.png')]"
        style={{ backgroundImage: "url('/img/bg/finishing.png')" }}
        id="section_5"
      >
        <h1 className="text-white text-3xl md:text-4xl block">
          당신의 여정을 응원합니다.
        </h1>
        <button className="text-white font-medium  m-2 p-2 border-2 rounded-md block mt-4">
          시작하기
        </button>
      </section>
    </div>
  );
};

export default Landing;
