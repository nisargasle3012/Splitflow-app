// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user, isCheckingAuth } = useAuth();

//   if (isCheckingAuth) {
//     return (
//       <div className="page-loader">
//         Loading...
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/users/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/users/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
