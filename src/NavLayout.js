// Layout.js
import React, { useState } from 'react';
import style from './NavLayout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function NavLayout({ children }) {
    // State to track the visibility of the menu
    const [menuVisible, setMenuVisible] = useState(false);

    // Function to toggle the menu visibility when the hamburger icon is clicked
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <>
            {/* Navigation Bar */}
            <nav className={style.NavBar}>
                <div className={style.NavContainer}>
                    {/* Hamburger Icon for Mobile */}
                    <div className={style.NavToggle} onClick={toggleMenu}>
                        {/* Icon based on menu visibility */}
                        {menuVisible ? (
                            <FontAwesomeIcon icon={faTimes} className={style.CloseIcon} />
                        ) : (
                            <FontAwesomeIcon icon={faBars} className={style.Hamburger} />
                        )}
                    </div>
                    {/* Navigation Menu (Initially Hidden on Small Screens) */}
                    <ul className={`${style.NavList} ${menuVisible ? style.Visible : ''}`}> {/* If menuVisible is true, it adds the style.Visible class; otherwise, it adds an empty string, effectively not adding any additional class.}
                        {/* Menu Items */}
                        <li className={style.NavItem}>
                            <a className={style.NavLink} href="/">Home</a>
                        </li>
                        <li className={style.NavItem}>
                            <a className={style.NavLink} href="/new">New Todo</a>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* Content */}
            {children}
        </>
    );
}

export default NavLayout;

