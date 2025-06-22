import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold text-red-400">
          STRMLY
        </Link>
        <div className="space-x-4 text-sm">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/upload" className="hover:underline">
            Upload
          </Link>
          <Link to="/recommended" className="hover:underline">
            Recommended
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/signup" className="hover:underline">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}
