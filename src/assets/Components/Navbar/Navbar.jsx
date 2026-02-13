import style from './Navbar.module.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
export default function Navbar() {
    const hidesidebar=()=>{
        document.querySelector(`.${style.sidenavbar}`).style.display='none';
    }
    const showsidebar=()=>{
        document.querySelector(`.${style.sidenavbar}`).style.display='block';
    }
    return (
        <>
           <nav className={style.navbar}>
            <div className={style.logo}>
                <img src={logo} alt="Logo" className={style.logoImage} />
                <h1 className={style.title}>BIORYX</h1>
            </div>
            <div>
                <ul className={style.navlinks}>
                    <li  className={style.liitem}><a href="">Home</a></li>
                    <li  className={style.liitem}><Link to="/aboutus">About</Link></li>
                    <li  className={style.liitem}><a href="">Events</a></li>
                    <li  className={style.liitem}><Link to="/contact">Contact</Link></li>
                    <svg onClick={showsidebar} width="32" height="32" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={style.menuIcon}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </ul>
            </div>
            <div className={style.sidenavbar}>
                <ul className={style.sidenavlinks}>
                    <li style={{'padding':'10px'}} onClick={hidesidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={style.closeIcon}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
</li>
                    <li><a href="">Home</a></li>
                    <li><Link to="/aboutus">About</Link></li>
                    <li><a href="">Events</a></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
           </nav>
        </>
        )
}