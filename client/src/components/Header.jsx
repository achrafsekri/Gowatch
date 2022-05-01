import React from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  console.log(location.pathname);
  return <div className={location.pathname === "/" && "hidden"}></div>;
}

export default Header;
