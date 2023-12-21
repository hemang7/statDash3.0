import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { UserAuth } from "../context/AuthContext";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout(auth);
    } catch (e) {
      console.log("Error logging out: " + e.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">
      <div className="container mx-auto p-3">
        <div className="flex items-center justify-between">
          {/* App Name */}
          <Link
            to="/main-app"
            className={`text-lg font-bold leading-relaxed  ${
              navbarOpen ? "hidden" : ""
            }`}
          >
            QCS StatDash
          </Link>
          <button
            className="lg:hidden absolute top-3 right-3 text-white text-md leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i
              className={`fas ${navbarOpen ? "fa-times" : "fa-bars"}`}
              style={{ color: "white" }}
            ></i>
          </button>
          <div
            className={`lg:flex items-center justify-center${
              navbarOpen ? " flex-col" : " hidden"
            }`}
          >
            <ul className="flex flex-col lg:flex-row list-none sm:gap-7">
              <li className="nav-item">
                <Link
                  to="/main-app"
                  className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:bg-blue-700 rounded-lg"
                  onClick={() => setNavbarOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/user-guide"
                  className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:bg-blue-700 rounded-lg"
                  onClick={() => setNavbarOpen(false)}
                >
                  User Guide
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/my-analysis"
                  className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:bg-blue-700 rounded-lg"
                  onClick={() => setNavbarOpen(false)}
                >
                  My Analysis
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/FAQs"
                  className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:bg-blue-700 rounded-lg"
                  onClick={() => setNavbarOpen(false)}
                >
                  FAQs
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:bg-blue-700 rounded-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
