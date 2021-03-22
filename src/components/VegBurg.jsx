import { useContext } from "react"
import { StoreContext } from "../Store"

import { Link } from "react-router-dom"

import "./VegBurg.scss"

export const VegBurg = () => {
    const { user, isOpen, closeMenu, logout } = useContext(StoreContext)

    const logoutBtn = () => {
        closeMenu()
        logout()
    }

    return (
        <div className={isOpen ? "burger-menu burger-menu-open" : "burger-menu"}>
            {!user ?
                <Link onClick={closeMenu} className="menu-item" to="/dashboard">Login / Sign up</Link> :
                <Link onClick={logoutBtn} className="menu-item" to="/">Log Out</Link>
            }
            <Link onClick={closeMenu} className="menu-item" to="/settings">Settings</Link>
            <Link onClick={closeMenu} className="menu-item" to="/about">About</Link>
            <Link onClick={closeMenu} className="menu-item" to="/feedback">Feedback</Link>
        </div>
    )
}
