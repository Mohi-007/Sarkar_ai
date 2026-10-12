import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MootCourt from './pages/MootCourt';
import CodeMatrix from './pages/CodeMatrix';
import DocumentScanner from './pages/DocumentScanner';
import BailPredictor from './pages/BailPredictor';
import QAEngine from './pages/QAEngine';
import CaseExplorer from './pages/CaseExplorer';
import Dashboard from './pages/Dashboard';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#070b14]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Main Layout Component
const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-[#070b14] overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-court-pattern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
          
          {/* Judicial Dark Theme Toaster */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0b132b',
                color: '#f5d77f',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '12px',
                fontWeight: '600',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#070b14',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#070b14',
                },
              },
            }}
          />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Home />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/moot"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <MootCourt />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/matrix"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <CodeMatrix />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/document"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <DocumentScanner />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/bail"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <BailPredictor />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/qa"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <QAEngine />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/cases"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <CaseExplorer />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
