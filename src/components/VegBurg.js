import React, { useContext } from 'react'
import './VegBurg.scss'
import { Link } from 'react-router-dom'
import { StoreContext } from "../Store";

const VegBurg = () => {
    const { user, isOpen, closeMenu, logout } = useContext(StoreContext)

    const logoutBtn = () => {
        closeMenu()
        logout()
    }

    return (
        <div className={isOpen ? "burger-menu burger-menu-open" : "burger-menu"}>
            {user ?
                    <Link onClick={closeMenu} className="menu-item" to="/">Dashboard</Link>
                :
                <Link onClick={closeMenu} className="menu-item" to="/dashboard">Log In/Sign Up</Link>
            }
            <Link onClick={closeMenu} className="menu-item" to="/feedback">Feedback</Link>
            <Link onClick={closeMenu} className="menu-item" to="/settings">Settings</Link>
            { user && 
                <Link onClick={logoutBtn} className="menu-item" to="/">Log Out</Link>
            }
            {/* <Link onClick={closeMenu} className="menu-item" to="/log">Practice Log</Link> */}
            {/* <Link onClick={closeMenu} className="menu-item" to="/record">Record</Link> */}
            {/* <Link onClick={closeMenu} className="menu-item" to="/metdrone">MetDrone</Link> */}
            {/* <Link onClick={closeMenu} className="menu-item" to="/fork">Fork</Link> */}
        </div>
    );
}

export default VegBurg;