import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Check authentication status on component mount and when storage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        setIsLoggedIn(true);
        try {
          const userData = JSON.parse(user);
          setUserName(userData.name || userData.email?.split('@')[0] || 'User');
        } catch (e) {
          console.error('Error parsing user data:', e);
          setUserName('User');
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    // Check on mount
    checkAuth();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);

    // Custom event for same-tab login/logout
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Update state
    setIsLoggedIn(false);
    setUserName("");

    // Dispatch custom event for other components
    window.dispatchEvent(new Event('authChange'));

    // Redirect to home
    navigate('/');
  };

  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-teal-600 text-3xl">💓</span>
          <h1 className="text-2xl font-bold text-[#0C7B93]">HealthCheck AI</h1>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex gap-8">
          <Link to="/" className="text-gray-600 hover:text-[#0C7B93]">Home</Link>
          <Link to="/diagnose" className="text-gray-600 hover:text-[#0C7B93]">Diagnose</Link>
          <Link to="/doctors" className="text-gray-600 hover:text-[#0C7B93]">Doctors</Link>
          <Link to="/about" className="text-gray-600 hover:text-[#0C7B93]">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-[#0C7B93]">Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700 font-medium hidden sm:inline">
                Hello, {userName}
              </span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth?mode=login" className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Login
              </Link>
              <Link to="/auth?mode=signup" className="px-5 py-2 bg-[#0C7B93] text-white rounded-lg hover:bg-[#095f70] transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
