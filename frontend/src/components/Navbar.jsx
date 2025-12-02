import { Link } from "react-router-dom";

export default function Navbar() {
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
        <div className="flex gap-4">
          <Link to="/auth?mode=login" className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Login
          </Link>
          <Link to="/auth?mode=signup" className="px-5 py-2 bg-[#0C7B93] text-white rounded-lg hover:bg-[#095f70] transition-colors">
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
}
