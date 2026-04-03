import { useState } from 'react';
import style from './Navbar.module.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <>
           <nav className={style.navbar}>
            <div className={style.logo}>
                <img src={logo} alt="Logo" className={style.logoImage} />
                <h1 className={style.title}>BIORYX</h1>
            </div>
            <div>
                <ul className={style.navlinks}>
                    <li className={style.liitem}><Link to="/">Home</Link></li>
                    <li className={style.liitem}><Link to="/aboutus">About</Link></li>
                    <li className={style.liitem}><Link to="/events">Events</Link></li>
                    <li className={style.liitem}><Link to="/people">People</Link></li>
                    <li className={style.liitem}><Link to="/contact">Contact</Link></li>
                    <svg onClick={() => setSidebarOpen(true)} width="32" height="32" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={style.menuIcon}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </ul>
            </div>
            <div className={style.navbarr}>
                <button className={style.joinbtn}><a href='https://chat.whatsapp.com/IDyoVAj9X0QFfMpI2DTfC8' target="_blank" rel="noopener noreferrer">Join Us</a></button>
            </div>
            
            {/* Backdrop overlay */}
            {sidebarOpen && <div className={style.backdrop} onClick={closeSidebar}></div>}

            <div className={`${style.sidenavbar} ${sidebarOpen ? style.open : ''}`}>
                <ul className={style.sidenavlinks}>
                    <li className={style.closeBtn} onClick={closeSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={style.closeIcon}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </li>
                    <li className={style.sideitem}><Link to="/" onClick={closeSidebar}>Home</Link></li>
                    <li className={style.sideitem}><Link to="/aboutus" onClick={closeSidebar}>About</Link></li>
                    <li className={style.sideitem}><Link to="/events" onClick={closeSidebar}>Events</Link></li>
                    <li className={style.sideitem}><Link to="/contact" onClick={closeSidebar}>Contact</Link></li>
                    <li className={style.sideitem}><Link to="/people" onClick={closeSidebar}>People</Link></li>
                </ul>
            </div>
           </nav>
        </>
    )
}