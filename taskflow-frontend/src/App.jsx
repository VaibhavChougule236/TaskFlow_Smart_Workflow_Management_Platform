import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

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
import Home from "./pages/Home";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: '16px',
            background: '#ffffff',
            color: '#1e293b',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #f1f5f9',
            padding: '12px 24px',
          },
          success: {
            iconTheme: {
              primary: '#2563eb',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            user ? (
              user.role === "ADMIN" ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/" element={<ResetPassword />} />

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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;