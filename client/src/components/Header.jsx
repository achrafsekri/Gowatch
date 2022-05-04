import React from "react";
import { useLocation, Link } from "react-router-dom";

function Header() {
  const location = useLocation();
  return <div className=" h-15 p-7 pl-8 pr-8 flex bg-gray-900 justify-between">
      <div>
        <Link to='/' className="text-white ">GO WATCH</Link>
      </div>
      <nav className="flex ">
        <ul className="flex gap-5">
          <li id='location'><Link to='/' className='text-white hover:text-slate-200'>By Movie</Link></li>
          <li id='similar'><Link to='/' className='text-white  hover:text-slate-200'>By Genre</Link></li>
        </ul>
      </nav>
  </div>;
}

export default Header;
