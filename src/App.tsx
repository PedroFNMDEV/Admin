import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Revendas } from './pages/Revendas';
import { RevendaForm } from './pages/RevendaForm';
import { Administradores } from './pages/Administradores';
import { Logs } from './pages/Logs';
import { Profile } from './pages/Profile';
import { Layout } from './components/Layout';
import { Toaster } from './components/Toaster';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/revendas" element={<Revendas />} />
                      <Route path="/revendas/nova" element={<RevendaForm />} />
                      <Route path="/revendas/:id/editar" element={<RevendaForm />} />
                      <Route path="/administradores" element={<Administradores />} />
                      <Route path="/logs" element={<Logs />} />
                      <Route path="/perfil" element={<Profile />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;