import React from "react";
import { useLocation, Link } from "react-router-dom";
import Darkmode from "./Darkmode";

function Header() {
  const location = useLocation();
  return (
    <div className="flex justify-between pr-4 h-15 sm:p-7 sm:pl-11 sm:pr-11 bg-background_am dark:bg-background_pm ">
      <div className="flex items-center p-4 text-lg">
        <Link to="/" className="text-gray-800 dark:text-slate-50 ">
          GO WATCH
        </Link>
      </div>
      <nav className="flex items-center gap-5">
        <ul className="flex gap-5">
          <li id="location">
            <Link
              to="/"
              className="text-gray-800 dark:text-slate-50 hover:text-gray-500 dark:hover:text-slate-200"
            >
              By Movie
            </Link>
          </li>
          <li id="similar">
            <Link
              to="/"
              className="text-gray-800 dark:text-slate-50 hover:text-gray-500 dark:hover:text-slate-200"
            >
              Creator
            </Link>
          </li>
        </ul>
        <Darkmode />
      </nav>
    </div>
  );
}

export default Header;
