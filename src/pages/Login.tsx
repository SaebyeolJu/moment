import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/validation";

interface LoginProps {
  emailAddress: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [loginState, setLoginState] = useState<LoginProps>({
    emailAddress: "",
    password: "",
  });

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginState.emailAddress === "" || loginState.password === "") {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    if (!validateEmail(loginState.emailAddress)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (!validatePassword(loginState.password)) {
      alert("비밀번호는 소문자, 대문자, 숫자가 포함된 8자 이상이어야 합니다.");
      return;
    }

    try {
      const user = {
        email: loginState.emailAddress,
        password: loginState.password,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        user,
        config
      );

      if (response.data.success) {
        // 인증 상태를 업데이트하는 'LOGIN' 액션을 디스패치합니다.
        dispatch({
          type: "LOGIN",
          payload: {
            token: response.data.token,
            user: {
              userId: loginState.emailAddress,
              // 필요한 경우 다른 사용자 정보를 추가합니다.
            },
            loginMethod: "local",
          },
        });
        alert("로그인 성공");
        navigate("/dashboard");
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      alert("로그인 실패");
      console.error(error);
    }
  };

  return (
    <section className="dark:bg-slate-900 bg-yellow-500 min-h-screen flex items-center justify-center">
      {/* <!-- login container --> */}
      {/* <!-- image --> */}
      <div className="md:block hidden">
        <img className="rounded-2xl" src="./img/bg/card.png" />
      </div>
      <div className="bg-slate-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        {/* <!-- form --> */}
        <div className="w-full md:w-auto px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
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
              placeholder="Email"
              value={loginState.emailAddress}
              onChange={(e) =>
                setLoginState({ ...loginState, emailAddress: e.target.value })
              }
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Password"
                value={loginState.password}
                onChange={(e) =>
                  setLoginState({ ...loginState, password: e.target.value })
                }
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              로그인
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

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
            Login with Google
          </button>

          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            {/* link 페이지 만들어야함 */}
            {/* <Link to="/">Forgot your password?</Link> */}
            <p>비밀번호를 잊으셨나요?</p>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            {/* <p>Don't have an account?</p> */}
            <p>아직 회원이 아니신가요?</p>
            <button
              onClick={() => navigate("/signup")}
              className="py-2 px-5 ml-2 flex justify-evenly text-center bg-white border rounded-xl hover:scale-110 duration-300"
            >
              {/* Register */}
              가입하기 🙌
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
