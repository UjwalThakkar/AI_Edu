import { reducerCases } from "./constants";

export const initialState = {
  userInformation: undefined,
  all_branch: undefined,
  branch: undefined,
  all_sem: undefined,
  sem: undefined,
  all_sub: undefined,
  sub: undefined,
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

      case reducerCases.SET_ALL_BRANCH:
      return {
        ...state,
        all_branch: action.all_branch,
      };

    case reducerCases.SET_ALL_SEM:
      return {
        ...state,
        all_sem: action.all_sem,
      };

    case reducerCases.SET_SEM:
      return {
        ...state,
        sem: action.sem,
      };

    case reducerCases.SET_ALL_SUB:
      return {
        ...state,
        all_sub: action.all_sub,
      };

    case reducerCases.SET_SUB:
      return {
        ...state,
        sub: action.sub,
      };

    default:
      return state;
  }
};

export default reducer;
