import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { Heart, User, Users, Mail, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsMobileMenuOpen(false);
      navigate('/login');
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/feed"
            className="flex items-center gap-2 text-2xl font-bold text-primary-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Heart className="w-6 h-6" />
            <span>MatchMingle</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/feed"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Discover</span>
            </Link>
            <Link
              to="/requests"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Requests</span>
            </Link>
            <Link
              to="/connections"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>Matches</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>{user?.firstName}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button and quick icons */}
          <div className="md:hidden flex items-center gap-4">
            <Link
              to="/profile"
              className="text-primary-600 p-1"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Profile"
            >
              <User className="w-6 h-6" />
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-primary-600 p-1"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1 bg-white border-t border-gray-100 shadow-xl">
            <Link
              to="/feed"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Discover</span>
            </Link>
            <Link
              to="/requests"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">Requests</span>
            </Link>
            <Link
              to="/connections"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="font-medium">Matches</span>
            </Link>
            <div className="pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}