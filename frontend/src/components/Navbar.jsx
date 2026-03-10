import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { Heart, User, Users, Mail, LogOut } from 'lucide-react';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/feed" className="flex items-center gap-2 text-2xl font-bold text-primary-600">
            <Heart className="w-6 h-6" />
            <span>MatchMingle</span>
          </Link>

          {/* Navigation Links */}
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/profile" className="text-primary-600">
              <User className="w-6 h-6" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}