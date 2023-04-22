import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BsLockFill, BsLock } from "react-icons/bs";

import { AuthContext } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/validation";

interface SignUpProps {
  emailAddress: string;
  password: string;
  passwordConfirm: string;
  agreedTerms: boolean;
}

const SignUp = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const text = `사용약관`;

  const [signUpState, setSignUpState] = React.useState<SignUpProps>({
    emailAddress: "",
    password: "",
    passwordConfirm: "",
    agreedTerms: false,
  });

  function handleAgreedTerms(e: React.ChangeEvent<HTMLInputElement>): void {
    setSignUpState({ ...signUpState, agreedTerms: e.target.checked });
  }

  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      signUpState.emailAddress === "" ||
      signUpState.password === "" ||
      signUpState.passwordConfirm === ""
    ) {
      alert("이메일과 비밀번호를 입력하고 약관에 동의해주세요.");
      return;
    }

    if (!validateEmail(signUpState.emailAddress)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (
      !validatePassword(signUpState.password) ||
      !validatePassword(signUpState.passwordConfirm)
    ) {
      alert("비밀번호는 소문자, 대문자, 숫자가 포함된 8자 이상이어야 합니다.");
      return;
    }

    if (signUpState.password !== signUpState.passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const newUser = {
        userId: signUpState.emailAddress,
        password: signUpState.password,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        newUser,
        config
      );

      if (response.data.success) {
        dispatch({
          type: "LOGIN",
          payload: {
            token: response.data.token,
            user: {
              userId: signUpState.emailAddress,
              username: signUpState.emailAddress,
              // 필요한 경우 다른 사용자 정보를 추가합니다.
            },
            loginMethod: "local",
          },
        });

        alert("가입 성공");
        navigate("/dashboard");
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      alert("회원가입 실패");
      console.error(error);
    }
  };

  return (
    <section className="dark:bg-slate-900 bg-yellow-500 bg-gray-50 min-h-screen flex items-center justify-center">
      {/* <!-- login container --> */}
      <div className="bg-slate-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src="./img/bg/card.png" />
        </div>

        {/* <!-- form --> */}
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">회원가입</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-4"
          >
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="이메일"
              value={signUpState.emailAddress}
              onChange={(e) =>
                setSignUpState({ ...signUpState, emailAddress: e.target.value })
              }
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="비밀번호"
                value={signUpState.password}
                onChange={(e) =>
                  setSignUpState({ ...signUpState, password: e.target.value })
                }
              />
              <BsLockFill className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" />
            </div>
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                value={signUpState.passwordConfirm}
                onChange={(e) =>
                  setSignUpState({
                    ...signUpState,
                    passwordConfirm: e.target.value,
                  })
                }
              />

              <BsLock className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" />
            </div>
            <p className="text-xs">
              비밀번호는 소문자, 대문자, 숫자가 포함된 8자 이상이어야 합니다.
            </p>

            {/* 사용자 약관 */}
            {/* <div className="flex flex-col items-center justify-center">
              <textarea
                className="p-2 border rounded-md resize-none w-full h-60 max-h-60 overflow-y-auto"
                value={text}
                readOnly
              />

              <div>
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={signUpState.agreedTerms}
                  onChange={(e) =>
                    setSignUpState({
                      ...signUpState,
                      agreedTerms: e.target.checked,
                    })
                  }
                />
                <label htmlFor="agree" className="ml-2">
                  [필수] 이용약관 및 개인정보 처리 방침 동의
                </label>
              </div>
            </div> */}

            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              회원가입
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm"> 간편 회원가입 </p>
            <hr className="border-gray-400" />
          </div>

          {/* 회원가입 안하고 구경하기 */}
          {/* google login button */}
          <button
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
            onClick={handleGoogleLogin}
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Google로 회원가입
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
          >
            🔎 구경하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
