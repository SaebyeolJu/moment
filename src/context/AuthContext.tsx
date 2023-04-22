// src/context/AuthContext.ts
import { createContext, Dispatch } from "react";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: {
    userId: string;
    username: string;
  } | null;
  loginMethod: string | null;
}

export type AuthAction =
  | {
      type: "LOGIN";
      payload: {
        loginMethod: string;
        token: string;
        user: {
          userId: string;
          username: string;
        };
      };
    }
  | { type: "LOGOUT" };

export const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
  loginMethod: null,
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

/**
 *
 * @param state - AuthContext의 상태
 * @param action - LOGIN, LOGOUT
 * @returns AuthContext의 상태
 * @description AuthContext의 리듀서
 */
export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        user: {
          userId: action.payload.user.userId,
          username: action.payload.user.username,
        },
        loginMethod: action.payload.loginMethod,
      };
    case "LOGOUT":
      sessionStorage.removeItem("token");
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        user: null,
        loginMethod: null,
      };
  }
};
