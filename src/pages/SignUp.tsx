import React from "react";
import { useNavigate } from "react-router-dom";
import { BsLockFill, BsLock } from "react-icons/bs";
import { validateEmail, validatePassword } from "../functions/validation";

interface SignUpProps {
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  const [signUpState, setSignUpState] = React.useState<SignUpProps>({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    if (
      signUpState.email === "" ||
      signUpState.password === "" ||
      signUpState.passwordConfirm === ""
    ) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    if (!validateEmail(signUpState.email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (!validatePassword(signUpState.password)) {
      alert("비밀번호는 소문자, 대문자, 숫자가 포함된 8자 이상이어야 합니다.");
      return;
    }

    if (!validatePassword(signUpState.passwordConfirm)) {
      alert("비밀번호는 소문자, 대문자, 숫자가 포함된 8자 이상이어야 합니다.");
      return;
    }

    event.preventDefault();
  }

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      {/* <!-- login container --> */}
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
          />
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
              value={signUpState.email}
              onChange={(e) =>
                setSignUpState({ ...signUpState, email: e.target.value })
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
                name="password"
                placeholder="비밀번호 확인"
                value={signUpState.password}
                onChange={(e) =>
                  setSignUpState({ ...signUpState, password: e.target.value })
                }
              />
              <BsLock className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              로그인
              {/* Login */}
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          {/* 회원가입 안하고 구경하기 */}
          <button
            onClick={() => navigate("/collection")}
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
