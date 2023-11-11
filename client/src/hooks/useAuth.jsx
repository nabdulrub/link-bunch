import Cookies from "js-cookie";

const TOKEN_KEY = "token";
const SESSION_KEY = "session";

const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { secure: true, sameSite: "Strict" });
};

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  return token || "";
};

const setSession = (userData) => {
  Cookies.set(SESSION_KEY, JSON.stringify(userData), {
    secure: true,
    sameSite: "Strict",
  });
};

const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

const removeSession = () => {
  Cookies.remove(SESSION_KEY);
};

export const autoLogin = () => {
  const token = Cookies.get(TOKEN_KEY);
  const userData = Cookies.get(SESSION_KEY);

  if (token && userData) {
    return true;
  }

  return null;
};

export const signIn = ({ userData, token }) => {
  setToken(token);
  setSession(userData);
};

export const signOut = () => {
  removeToken();
  removeSession();
};

export const getSession = () => {
  const token = Cookies.get(TOKEN_KEY);
  const user = Cookies.get(SESSION_KEY);

  if (token && user) {
    return JSON.parse(user);
  }

  return null;
};
