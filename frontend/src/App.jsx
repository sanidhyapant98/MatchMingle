import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import AuthModule from './modules/auth/AuthModule';
import FeedModule from './modules/feed/FeedModule';
import ProfileModule from './modules/profile/ProfileModule';
import ConnectionsModule from './modules/connections/ConnectionsModule';
import RequestsModule from './modules/requests/RequestsModule';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-primary-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<AuthModule />} />
        <Route path="/signup" element={<AuthModule />} />

        {/* Protected routes */}
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <FeedModule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileModule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/connections"
          element={
            <ProtectedRoute>
              <ConnectionsModule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <RequestsModule />
            </ProtectedRoute>
          }
        />

        {/* Fallback routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/feed" /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;