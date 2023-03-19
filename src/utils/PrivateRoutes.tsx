// src/PrivateRoute.tsx
import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * @description PrivateRoute의 Props 타입 정의
 * @type {PrivateRoutesProps} - PrivateRoute의 Props 타입
 * @type {path} - 라우팅 경로
 * @type {element} - 라우팅 컴포넌트
 */

const PrivateRoutes: React.FC = () => {
  const { state: authState } = useContext(AuthContext);

  return authState.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
