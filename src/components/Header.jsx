import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Home, Briefcase, LogOut } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="w-full flex items-center justify-between bg-[#202020] px-6 py-4 shadow-lg">
      <Link to="/" className="flex items-center">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="h-[30px]"
        />
      </Link>

      {/* Navigation links for md+ */}
      <ul className="hidden md:flex gap-6 text-white font-medium">
        <li>
          <Link to="/" className="hover:text-blue-400 transition duration-200">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/jobs"
            className="hover:text-blue-400 transition duration-200"
          >
            Jobs
          </Link>
        </li>
      </ul>

      {/* Icons for md- */}
      <ul className="flex md:hidden gap-4 text-white">
        <li>
          <Link to="/" className="hover:text-blue-400 transition duration-200">
            <Home size={24} />
          </Link>
        </li>
        <li>
          <Link
            to="/jobs"
            className="hover:text-blue-400 transition duration-200"
          >
            <Briefcase size={24} />
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={onClickLogout}
            className="hover:text-red-400 transition duration-200"
          >
            <LogOut size={24} />
          </button>
        </li>
      </ul>

      {/* Logout button for md+ */}
      <button
        type="button"
        onClick={onClickLogout}
        className="hidden md:block bg-[#6366f1] text-white px-6 py-2 rounded-md cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
}
