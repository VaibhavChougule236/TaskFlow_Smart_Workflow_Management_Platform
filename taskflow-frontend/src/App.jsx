import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/dashboard/Dashboard";
import MyTasks from "./pages/tasks/MyTasks";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTasks from "./pages/admin/AllTasks";
import Users from "./pages/admin/Users";

import AppLayout from "./layout/AppLayout";
import PrivateRoute from "./components/common/PrivateRoute";

import AdminRoute from "./components/common/AdminRoute";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>

      <Routes>

        {/* Root redirect */}
        <Route
          path="/"
          element={
            user
              ? <Navigate to="/dashboard" />
              : <Navigate to="/login" />
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
            <AdminRoute>
              <AppLayout>
                <AdminDashboard />
              </AppLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/tasks"
          element={
            <AdminRoute>
              <AppLayout>
                <AdminTasks />
              </AppLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AppLayout>
                <Users />
              </AppLayout>
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;