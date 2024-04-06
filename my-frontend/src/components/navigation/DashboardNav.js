
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import { SidebarData } from './SidebarData';
import styles from '../navigation/DashboardNav.module.css'; // Import as a module
import { IconContext } from 'react-icons';

function DashboardNav() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className={styles.navbar}>
                    <Link to='#' className={styles['menu-bars']}>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <nav className={sidebar ? `${styles['nav-menu']} ${styles.active}` : styles['nav-menu']}>
                    <ul className={styles['nav-menu-items']} onClick={showSidebar}>
                        <li className={styles['navbar-toggle']}>
                            <Link to='#' className={styles['menu-bars']}>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={styles[item.cName]}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default DashboardNav;


