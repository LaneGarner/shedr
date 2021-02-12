import React from 'react'
import './VegBurg.css'
import { Link } from 'react-router-dom'

const VegBurg = ({ closeMenu, isOpen, logout, user }) =>{

    const logoutBtn = () => {
        closeMenu()
        logout()
    }

    return (
        <div className={isOpen ? "burger-menu burger-menu-open" : "burger-menu"}>
            {user ?
                <>
                    <Link onClick={logoutBtn} className="menu-item" to="/user">Log Out</Link>
                    <Link onClick={closeMenu} className="menu-item" to="/user">User</Link>
                </>
                :
                <Link onClick={closeMenu} className="menu-item" to="/user">Log In</Link>
            }
            <Link onClick={closeMenu} className="menu-item" to="/">Shed</Link>
            <Link onClick={closeMenu} className="menu-item" to="/record">Record</Link>
            <Link onClick={closeMenu} className="menu-item" to="/metdrone">MetDrone</Link>
            <Link onClick={closeMenu} className="menu-item" to="/fork">Fork</Link>
            <Link onClick={closeMenu} className="menu-item" to="/feedback">Feedback</Link>
            <Link onClick={closeMenu} className="menu-item" to="/settings">Settings</Link>
        </div>
    );
}

export default VegBurg;