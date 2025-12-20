import { useSession } from "../features/auth/useSession";

const AppShell = ({ children }) => {
  const { isLoading } = useSession();

  if (isLoading) {
    return <div className="page-loader">Checking session...</div>;
  }

  return children;
};

export default AppShell;
