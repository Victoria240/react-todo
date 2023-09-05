// Layout.js
import React from 'react';
import style from './NavLayout.module.css';

function NavLayout({ children }) {
    return (
        <>
            <nav className={style.NavBar}>
                <div className={style.NavContainer}>
                    <ul className={style.NavList}>
                        <li className={style.NavItem}>
                            <a className={style.NavLink} href="/">Home</a>
                        </li>
                        <li className={style.NavItem} >
                            <a className={style.NavLink} href="/new">New Todo</a>
                        </li>
                    </ul>
                </div>
            </nav>
            {children}
        </>
    );
}

export default NavLayout;
