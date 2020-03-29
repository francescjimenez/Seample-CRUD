import React from 'react';
import { NavLink } from "react-router-dom"


const Header = () => (
    <header>
        <nav>
            <ul className="nav justify-content-center">
                <li className = "nav-item">
                    <NavLink
                        className="nav-link"
                        to="/"
                        exact
                    >
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/orders"
                    >
                        Orders
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/about"
                    >
                        About
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header>
);
export default Header;
