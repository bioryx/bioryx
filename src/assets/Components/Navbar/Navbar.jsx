import style from './Navbar.module.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
export default function Navbar() {
    return (
        <>
           <nav className={style.navbar}>
            <div className={style.logo}>
                <img src={logo} alt="Logo" className={style.logoImage} />
                <h1 className={style.title}>BIORYX</h1>
            </div>
            <div>
                <ul className={style.navlinks}>
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