export default function authReducer(state, { payload, type }) {
  switch (type) {
    case "LOADING":
      return { ...state, error: null, loading: true };
    case "MODE":
      return { ...state, mode: payload };
    case "SETUP_DATA":
      return { ...state, setup_data: payload };
    case "SUCCESS":
      return {
        ...state,
        error: null,
        loading: false,
        data: payload,
        loggedIn: true,
      };
    case "ERROR":
      return { ...state, loading: false, error: payload };
    case "LOGOUT":
      return defaultAuth;
    default:
      return { ...state, loading: false };
  }
}

export const defaultAuth = {
  loggedIn: false,
  mode: null,
  data: {},
  setup_data: {
    email: "",
  },
  loading: false,
  error: null,
};
