import { useEffect, useContext } from "react"
import { Link } from "react-router-dom"

import { StoreContext } from "../Store"
import firebase, { uiConfig } from "../firebase"

import { Login } from "./Login.jsx";

import { LogIcon } from "../icons/LogIcon"
import { PaperClipIcon } from "../icons/PaperClipIcon"
import { RecordIconLarge } from "../icons/RecordIconLarge"
import { MetDroneIconLarge } from "../icons/MetDroneIconLarge"
import { ForkIconLarge } from "../icons/ForkIconLarge"
import { PieChartIcon } from "../icons/PieChartIcon"

import "./User.scss"

const firebaseAuth = firebase.auth()

export const User = () => {
    const { user, setActivePage } = useContext(StoreContext)

    useEffect(() => {
        setActivePage("user")
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="userContainer">
            {!user && 
                <div>
                    <h1>Welcome to Shedr</h1>
                    <p>To get the most out of Shedr, please login or sign up.</p>
                    <p>With an account you can save practice logs, create a repertoire list, and even make recordings. <br/> Best of all you can access all of this content from any of your devices when you're logged in.</p>
                    <Login uiConfig={uiConfig} firebaseAuth={firebaseAuth} /> 
                    <p>Sign up</p>
                </div>
                }
                {user && (
                <div>
                    <h1>Hello {user.displayName.split(" ")[0]}, welcome to Shedr</h1>
                    <p style={{color: "orange"}}>Choose an option below</p>
                <div className="userDashboard">
                    <Link to="/log">
                        <div className="card">
                            <LogIcon />
                            <h2>Practice log</h2>
                        </div>
                    </Link>
                    <Link to="/rep">
                        <div className="card">
                            <PaperClipIcon />
                            <h2>Repertoire list</h2>
                        </div>
                    </Link>
                    <Link to="/stats">
                        <div className="card">
                            <PieChartIcon />
                            <h2>Practice stats</h2>
                        </div>
                    </Link>
                    {/* <Link to="/record">
                        <div className="card">
                            <RecordIconLarge />
                            <h2>Record</h2>
                        </div>
                    </Link> */}
                    <Link to="/metdrone">
                        <div className="card">
                            <MetDroneIconLarge />
                            <h2>MetDrone</h2>
                        </div>
                    </Link>
                    <Link to="/fork">
                        <div className="card">
                            <ForkIconLarge />
                            <h2>Tuner</h2>
                        </div>
                    </Link>
                </div>
            </div>
        )}
        </div>
    )
}
