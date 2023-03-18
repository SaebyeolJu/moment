import React, { useContext, Dispatch } from "react";

import { useNavigate } from "react-router-dom";
import { AuthAction } from "../types/AuthAction";

export const handleLogout = (dispatch: Dispatch<AuthAction>) => {
  const navigate = useNavigate();

  // 로그아웃 액션을 디스패치합니다.
  dispatch({ type: "LOGOUT" });
  // 로그아웃 후, 메인 페이지로 이동합니다.
  navigate("/");
};
