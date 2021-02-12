import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Login } from "./Login";
import { LogIcon } from "../icons/LogIcon";
import { PaperClipIcon } from "../icons/PaperClipIcon";
import { PieChartIcon } from "../icons/PieChartIcon";

import "./User.css"

export const User = ({ uiConfig, firebaseAuth, user, setActivePage }) => {
    
    useEffect(() => {
        setActivePage("user")
    })

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="userContainer">
            {!user && <Login setActivePage={setActivePage} uiConfig={uiConfig} firebaseAuth={firebaseAuth} /> }
                {user && (
                <div>
                    <h1>Hello {user.displayName.split(" ")[0]}, welcome to Shedr</h1>
                    <p>Choose an option below to access your personal content</p>
                <div className="userDashboard">
                    <Link to="log">
                        <div className="user-dashboard-card">
                            <LogIcon />
                            <h2>Practice log</h2>
                        </div>
                    </Link>
                    <Link to="/user">
                        <div onClick={()=>alert('feature coming soon')} className="user-dashboard-card">
                            <PaperClipIcon />
                            <h2>Repertoire list</h2>
                        </div>
                    </Link>
                    <Link to="/user">
                        <div onClick={()=>alert('feature coming soon')} className="user-dashboard-card">
                            <PieChartIcon />
                            <h2>Practice stats</h2>
                        </div>
                    </Link>
                </div>
            </div>
        )}
        </div>
    )
}

