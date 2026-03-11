import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Dashboard from "./pages/dashboard/Dashboard";
import MyTasks from "./pages/tasks/MyTasks";

import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";
import ChangePassword from "./pages/user/ChangePassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTasks from "./pages/admin/AdminTasks";
import AdminUsers from "./pages/admin/Users";

import AppLayout from "./layout/AppLayout";
import PrivateRoute from "./components/common/PrivateRoute";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>

      <Routes>

        {/* ROOT REDIRECT */}

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

        {/* AUTH ROUTES */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

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

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <AppLayout>
                <Profile />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <AppLayout>
                <Settings />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <PrivateRoute>
              <AppLayout>
                <ChangePassword />
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