import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { StoreContext } from '../Store'
import firebase, { uiConfig } from '../firebase';

import { Login } from "./Login";

import { LogIcon } from "../icons/LogIcon";
import { PaperClipIcon } from "../icons/PaperClipIcon";
import { RecordIconLarge } from "../icons/RecordIconLarge";
import { MetDroneIconLarge } from "../icons/MetDroneIconLarge";
import { ForkIconLarge } from "../icons/ForkIconLarge";
import { PieChartIcon } from "../icons/PieChartIcon";

import "./User.scss"

const firebaseAuth = firebase.auth()

export const User = () => {
    const { user, setActivePage, isRecording } = useContext(StoreContext)
    
    useEffect(() => {
        setActivePage("user")
    })

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="userContainer">
            {!user && 
                <div>
                    <h2>Welcome to Shedr</h2>
                    <p>To get the most out of Shedr, please login or sign up.</p>
                    <p>With an account you can save practice logs, create a repertoire list, and even make recordings. Best of all you can access all of this content from any of your devices when you're logged in.</p>
                    <Login setActivePage={setActivePage} uiConfig={uiConfig} firebaseAuth={firebaseAuth} /> 
                    <p>Sign up</p>
                </div>
                }
                {user && (
                <div>
                    <h1>Hello {user.displayName.split(" ")[0]}, welcome to Shedr</h1>
                    <p style={{color: "orange"}}>Choose an option below</p>
                <div className="userDashboard">
                    <Link to="log">
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
                    <Link to="/">
                        <div onClick={()=>alert('feature coming soon')} className="card">
                            <PieChartIcon />
                            <h2>Practice stats</h2>
                        </div>
                    </Link>
                    <Link to="record">
                        <div className="card">
                            <RecordIconLarge />
                            <h2>Record</h2>
                        </div>
                    </Link>
                    <Link to="metdrone">
                        <div className="card">
                            <MetDroneIconLarge />
                            <h2>MetDrone</h2>
                        </div>
                    </Link>
                    <Link to="metdrone">
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

