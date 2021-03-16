import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../Store'

import { Logo } from "../icons/Logo"
import { FlatGuitarist } from "../images/FlatGuitarist"

import image from "../flat-gtrist-preview.png"

import './Home.scss'


export const Home = () => {
    const { setActivePage, activeSession, setActiveSession } = useContext(StoreContext)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        setActivePage("none")
    }, [])

    return (
        <div className="home-container">
            {/* <Logo height="20em"/> */}
            <div>
                <FlatGuitarist />
            </div>
            <div>
                <h1>Welcome to Shedr</h1>
                <p>Shedr is a musican's practice toolkit designed to sit on your music stand while you practice. It is optimized for desktop, tablet, and mobile so you can practice effeciently wherever you are.</p>
                <Link to="/dashboard" className="button"> Get Started</Link>
            </div>
            {/* <img style={{width: "40em"}} src={image}/> */}
            {/* {activeSession ?  */}
            {/* <Link onClick={startSession}  to="/log" className="button"> New practice session</Link> */}
            {/* } */}
        </div>
    )
}

