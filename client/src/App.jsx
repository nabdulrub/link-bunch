import { Outlet } from "react-router-dom";
import Navbar from "./components/dashboard/Navbar";
import { getSession } from "./hooks/useAuth";

const App = () => {
  const session = getSession();

  return (
    <body className="md:bg-gray-50 p-4 md:p-6 min-h-screen">
      {session && <Navbar />}
      <Outlet />
    </body>
  );
};

export default App;
