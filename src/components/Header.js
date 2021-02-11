import { findByLabelText } from '@testing-library/react';
import React, { useState, useEffect } from 'react'
import { HomeIcon } from "../icons/HomeIcon";
import { UserIcon } from "../icons/UserIcon";
import { Link } from 'react-router-dom'
import { matchPath } from "react-router-dom";
import { HamburgerVortex } from 'react-animated-burgers'

import "./Header.css"

import { VegBurgIcon } from "../icons/VegBurgIcon";
import VegBurg from "./VegBurg"

export const Header = ({ isOpen, setIsOpen, closeMenu, login, logout, user, activePage, setActivePage, activeSession, tempo, playing, timeSig, droning, root, chordType }) => {
    
    // const [isOpen, setIsOpen] = useState(false)

    // const closeMenu = () => {
    //     setIsOpen(false)
    // }


    // useEffect(() => {

    //     console.log(isOpen)
    // }, [isOpen])


    return (
        <header style={{zIndex: 1000}}>
            <nav>
                <Link onClick={closeMenu} to="/">
                    <HomeIcon activePage={activePage} />
                </Link>
                {user ? 
                <Link onClick={closeMenu} to="user">
                    <UserIcon activePage={activePage} />
                </Link> :
                <Link onClick={closeMenu} to="login">
                <UserIcon activePage={activePage} />
            </Link>
    
            }

            </nav>
                {activeSession && <Link onClick={closeMenu} to="/form">Current practice session</Link>}
                {playing && <Link onClick={closeMenu} to="./metdrone">{tempo}BPM {timeSig}/4</Link>}
                {droning && <Link onClick={closeMenu} to="./metdrone">{root} {chordType}</Link>}

            <div className="burger-button" onClick={() => setIsOpen(!isOpen)}>
                {/* <VegBurgIcon/> */}
                <HamburgerVortex barColor="white" isActive={isOpen} />
            </div>
            <VegBurg closeMenu={closeMenu} isOpen={isOpen} setIsOpen={setIsOpen} login={login} logout={logout} user={user} />
            {/* {isOpen && <VegBurg closeMenu={closeMenu} isOpen={isOpen} setIsOpen={setIsOpen} login={login} logout={logout} user={user} />} */}
                
        </header>
    )
}