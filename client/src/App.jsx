import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/AuthProvider";
import Navbar from "./components/dashboard/Navbar";

const App = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <body className="md:bg-gray-50 p-6">
        {isLoggedIn && <Navbar />}
        <Outlet />
      </body>
    </>
  );
};

export default App;
