import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GlobalBalance from "./pages/GlobalBalance";
import GlobalSettlements from "./pages/GlobalSettlements";
import GlobalActivity from "./pages/GlobalActivity";
import Groups from "./pages/Groups";
import GroupDetail from "./pages/GroupDetail";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="users/login" element={<Login />} />
          <Route path="users/signup" element={<Signup />} />

          {/* Protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <GlobalBalance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settlements"
            element={
              <ProtectedRoute>
                <GlobalSettlements />
              </ProtectedRoute>
            }
          />

          <Route
            path="/activity"
            element={
              <ProtectedRoute>
                <GlobalActivity />
              </ProtectedRoute>
            }
          />

          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <Groups />
              </ProtectedRoute>
            }
          />

          <Route
            path="/groups/:groupId"
            element={
              <ProtectedRoute>
                <GroupDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
