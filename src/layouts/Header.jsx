import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/Header.css";
const Header = () => {
  return (
    <header>
      <div>
        <div>
          <div className="Image"></div>
        </div>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <div className="Title">tomato accounting</div>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
