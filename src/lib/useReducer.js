import { reducerCases } from "./constants";

export const initialState = {
  userInformation: undefined,
  branch: undefined,
  sem: undefined,
  sub: undefined,
  resource: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      return {
        ...state,
        userInformation: action.userInformation,
      };

    case reducerCases.SET_BRANCH:
      return {
        ...state,
        branch: action.branch,
      };

    case reducerCases.SET_SEM:
      return {
        ...state,
        sem: action.sem,
      };

    case reducerCases.SET_SUB:
      return {
        ...state,
        sub: action.sub,
      };

    case reducerCases.SET_RESOURCES:
      return {
        ...state,
        resource: action.resource,
      };

    default:
      return state;
  }
};

export default reducer;
