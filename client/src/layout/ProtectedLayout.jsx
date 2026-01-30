// layout/ProtectedLayout.jsx
import { Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const ProtectedLayout = () => {
  return (
    <div>
      <header className="navbar">
        <h3>SplitFlow</h3>
        <LogoutButton />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
