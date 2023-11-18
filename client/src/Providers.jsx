import { UserProvider } from "./context/UserContext";
import { LinkProvider } from "./context/LinkContext";

const Providers = ({ children }) => {
  return (
    <LinkProvider>
      <UserProvider>{children}</UserProvider>
    </LinkProvider>
  );
};

export default Providers;
