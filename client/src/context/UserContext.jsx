import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../fetch/getUser";
import { getSession } from "../hooks/useAuth";

// Create a context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const session = getSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUserProfile() {
      if (session) {
        setLoading(true);
        const user = await getUser();
        if (user) {
          setUserData(user.user);
        }
        setLoading(false);
      }
    }

    getUserProfile();
  }, []);

  const revalidate = async () => {
    setLoading(true);
    const user = await getUser();

    if (user) {
      setUserData(user.user);
    }
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ userData, revalidate, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
