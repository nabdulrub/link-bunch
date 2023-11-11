import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/dashboard/Navbar";
import { autoLogin, getSession } from "./hooks/useAuth";
import { useEffect } from "react";

const App = () => {
  const session = getSession();
  const navigate = useNavigate();

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <>
      <body className="md:bg-gray-50 p-4 md:p-6">
        {session && <Navbar />}
        <Outlet />
      </body>
    </>
  );
};

export default App;
