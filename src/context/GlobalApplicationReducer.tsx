import {
  DELETE_TOKEN,
  INITIAL_STATE,
  LOGOUT,
  SET_TOKEN,
} from "../utils/globalState";

function GlobalApplicationReducer(state: any, action: any) {
  const { type, data } = action;

  switch (type) {
    case LOGOUT:
      return INITIAL_STATE;

    case SET_TOKEN:
      return { ...state, token: data };

    case DELETE_TOKEN:
      return { ...state, token: null };
  }
  return state;
}

export default GlobalApplicationReducer;
