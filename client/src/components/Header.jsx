import React from "react";
import { useLocation, Link } from "react-router-dom";
import Darkmode from "./Darkmode";

function Header() {
  const location = useLocation();
  return (
    <div className=" h-15 p-7 pl-11 pr-11 flex bg-primary justify-between">
      <div>
        <Link to="/" className="text-white ">
          GO WATCH
        </Link>
      </div>
      <nav className="flex items-center gap-5">
        <ul className="flex gap-5">
          <li id="location">
            <Link to="/" className="text-white hover:text-slate-200">
              By Movie
            </Link>
          </li>
          <li id="similar">
            <Link to="/" className="text-white  hover:text-slate-200">
              By Genre
            </Link>
          </li>
        </ul>
        <Darkmode/>
      </nav>
    </div>
  );
}

export default Header;
