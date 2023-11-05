import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Initialize user data from cookies on component mount
  useEffect(() => {
    const token = Cookies.get("token");
    const userData = Cookies.get("session");
    if (token) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);

  const signIn = ({ userData, token }) => {
    // Store the user token in cookies
    Cookies.set("token", token);
    Cookies.set("session", JSON.stringify(userData));

    // Sign in user
    setIsLoggedIn(true);

    // Set the user data in the state
    setUser(userData);
  };

  const signOut = () => {
    // Remove the user token from cookies
    Cookies.remove("token");
    Cookies.remove("session");

    // Clear user data from state
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
