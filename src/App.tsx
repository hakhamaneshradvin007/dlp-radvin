import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoginPage from "./components/Auth/LoginPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import PolicyList from "./components/Policies/PolicyList";
import LiveMonitoring from "./components/Monitoring/LiveMonitoring";
import AlertList from "./components/Alerts/AlertList";
import ReportsDashboard from "./components/Reports/ReportsDashboard";
import UserManagement from "./components/Users/UserManagement";
import SystemSettings from "./components/Settings/SystemSettings";
import UserLogs from "./components/Logs/UserLogs";
import { usePermissions } from "./hooks/usePermissions";

// Protected Route Component with Permission Check
const ProtectedRouteWithPermission: React.FC<{
  children: React.ReactNode;
  requiredRoute: string;
}> = ({ children, requiredRoute }) => {
  const { canAccessRoute } = usePermissions();

  if (!canAccessRoute(requiredRoute)) {
    return (
      <div className="min-h-screen animate-gradient flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-5V9m0 0V7m0 2h2m-2 0H10"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">دسترسی محدود</h3>
          <p className="text-lg text-gray-300">
            شما اجازه دسترسی به این بخش را ندارید.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ProtectedRouteWithPermission requiredRoute="/dashboard">
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  </ProtectedRouteWithPermission>
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <ProtectedRouteWithPermission requiredRoute="/dashboard">
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  </ProtectedRouteWithPermission>
                </ProtectedRoute>
              }
            />

            <Route
              path="/policies"
              element={
                <ProtectedRoute>
                  <ProtectedRouteWithPermission requiredRoute="/policies">
                    <MainLayout>
                      <PolicyList />
                    </MainLayout>
                  </ProtectedRouteWithPermission>
                </ProtectedRoute>
              }
            />

            <Route
              path="/monitoring"
              element={
                <ProtectedRoute>
                  <ProtectedRouteWithPermission requiredRoute="/monitoring">
                    <MainLayout>
                      <LiveMonitoring />
                    </MainLayout>
                  </ProtectedRouteWithPermission>
                </ProtectedRoute>
              }
            />

            <Route
              path="/alerts"
              element={
                <ProtectedRoute>
                  <ProtectedRouteWithPermission requiredRoute="/alerts">
                    <MainLayout>
                      <AlertList />
                    </MainLayout>
                  </ProtectedRouteWithPermission>
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <ProtectedRouteWithPermission requiredRoute="/reports">
                    <MainLayout>
                      <ReportsDashboard />
                    </MainLayout>
                  </ProtectedRouteWithPermission>
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <ProtectedRouteWithPermission requiredRoute="/users">
                    <MainLayout>
                      <UserManagement />
                    </MainLayout>
                  </ProtectedRouteWithPermission>
                </ProtectedRoute>
              }
            />

            <Route
              path="/logs"
              element={
                <ProtectedRoute>
                  <ProtectedRouteWithPermission requiredRoute="/logs">
                    <MainLayout>
                      <UserLogs />
                    </MainLayout>
                  </ProtectedRouteWithPermission>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <ProtectedRouteWithPermission requiredRoute="/settings">
                    <MainLayout>
                      <SystemSettings />
                    </MainLayout>
                  </ProtectedRouteWithPermission>
                </ProtectedRoute>
              }
            />

            {/* Catch all route - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
