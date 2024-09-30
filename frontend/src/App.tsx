import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoutes";
const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const EmployeeListPage = React.lazy(() => import("./pages/EmployeeListPage"));
const CreateEmployee = React.lazy(() => import("./pages/CreateEmployee"));
function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={<ProtectedRoute element={<Home />} />}
            />{" "}
            <Route
              path="/employee-list"
              element={<ProtectedRoute element={<EmployeeListPage />} />}
            />{" "}
            <Route
              path="/create-employee"
              element={<ProtectedRoute element={<CreateEmployee refetch={function (): void {
                throw new Error("Function not implemented.");
              } } />} />}
            />{" "}
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
