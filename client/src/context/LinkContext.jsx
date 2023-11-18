import { createContext, useContext, useEffect, useState } from "react";
import { getLinks } from "../fetch/getLinks";
import { getSession } from "../hooks/useAuth";

// Create a context
const LinkContext = createContext();

// Create a provider component
export const LinkProvider = ({ children }) => {
  const session = getSession();

  const [links, setLinks] = useState(null);

  useEffect(() => {
    async function getUserLinks() {
      if (session) {
        const userLinks = await getLinks();

        if (userLinks) {
          setLinks(userLinks.links);
        }
      }
    }

    getUserLinks();
  }, []);

  const revalidate = async () => {
    const userLinks = await getLinks();

    if (userLinks) {
      setLinks(userLinks.links);
    }
  };

  return (
    <LinkContext.Provider value={{ links, setLinks, revalidate }}>
      {children}
    </LinkContext.Provider>
  );
};

// Create a custom hook to use the context
export const useLinks = () => {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinkProvider");
  }
  return context;
};
