import React, { useState, useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const PrivateRoutes: React.FC = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAuthInfo();
  }, []);

  const fetchAuthInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/login/success",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch({
          type: "LOGIN",
          payload: {
            token: response.data.token,
            user: {
              email: response.data.user.email,
              // 필요한 경우 다른 사용자 정보를 추가합니다.
            },
            loginMethod: "google",
          },
        });
      } else {
        console.error("User is not authenticated");
      }
    } catch (error) {
      console.error("Error during fetching authentication info: ", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    // 로딩 중이면 로딩 컴포넌트를 표시합니다.
    return <div>Loading...</div>;
  }

  return authState.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
