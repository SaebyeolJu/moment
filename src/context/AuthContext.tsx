// src/context/AuthContext.ts
import { createContext, useReducer, Dispatch, ReactNode } from "react";
import { AuthAction } from "../types/AuthAction";

// 인증 상태 타입 정의
interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: any | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

// AuthContext 생성 및 초기 상태 정의
const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({
  state: {
    isLoggedIn: false,
    token: null,
    user: null,
  },
  dispatch: () => undefined,
});

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGOUT":
      sessionStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
