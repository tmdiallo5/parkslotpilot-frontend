import React, { useEffect, useReducer, useState } from "react";
import GlobalApplicationReducer from "./GlobalApplicationReducer";
import {
  DELETE_TOKEN,
  INITIAL_STATE,
  LOGOUT,
  SET_TOKEN,
} from "../utils/globalState";
import { data } from "react-router";

type StateType = {
  token?: string;
};

type Props = {
  state: StateType;
  setToken: (data: any) => void;
  deleteToken: () => void;
  logout: () => void;
};

export const GlobalApplicationContext = React.createContext<Props>({} as Props);

function GlobalApplicationContextProvider({ children }: any) {
  const savedToken = sessionStorage.getItem("token");

  const initialState = { ...INITIAL_STATE, token: savedToken };

  const [state, dispatch] = useReducer(GlobalApplicationReducer, initialState);

  useEffect(() => {
    if (state.token) {
      sessionStorage.setItem("token", state.token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [state.token]);

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const setToken = (data: any) => {
    dispatch({ type: SET_TOKEN, data });
  };

  const deleteToken = () => {
    dispatch({ type: DELETE_TOKEN });
  };

  return (
    <GlobalApplicationContext.Provider
      value={{ state, setToken, deleteToken, logout }}
    >
      {children}
    </GlobalApplicationContext.Provider>
  );
}

export default GlobalApplicationContextProvider;
