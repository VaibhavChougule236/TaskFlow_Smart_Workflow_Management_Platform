import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/dashboard/Dashboard";
import MyTasks from "./pages/tasks/MyTasks";

//import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminTasks from "./pages/admin/AllTasks";


import AppLayout from "./layout/AppLayout";
import PrivateRoute from "./components/common/PrivateRoute";

import AdminRoute from "./components/common/AdminRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTasks from "./pages/admin/AdminTasks";
import AdminUsers from "./pages/admin/Users";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>

      <Routes>

        {/* Root redirect */}
        <Route
          path="/"
          element={
            !user
              ? <Navigate to="/login" />
              : user.role === "ADMIN"
                ? <Navigate to="/admin/dashboard" />
                : <Navigate to="/dashboard" />
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTES */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/my-tasks"
          element={
            <PrivateRoute>
              <AppLayout>
                <MyTasks />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="ADMIN">
              <AppLayout>
                <AdminDashboard />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/tasks"
          element={
            <PrivateRoute role="ADMIN">
              <AppLayout>
                <AdminTasks />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <PrivateRoute role="ADMIN">
              <AppLayout>
                <AdminUsers />
              </AppLayout>
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;