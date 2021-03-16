import { useContext } from 'react'
import { StoreContext } from '../Store'

import { HomeIcon } from "../icons/HomeIcon"
import { UserIcon } from "../icons/UserIcon"
import { Link } from 'react-router-dom'
import { HamburgerSqueeze } from 'react-animated-burgers'
import { LogoIconSmall } from "../icons/LogoIconSmall"
import { LogIconHeader } from '../icons/LogIconHeader'

import VegBurg from "./VegBurg"

import "./Header.scss"

export const Header = () => {

    const { activePage, tempo, playing, timeSig, droning, root, chordType, activeSession, isOpen, setIsOpen, closeMenu } = useContext(StoreContext)
    return (
        <header style={{zIndex: 1000}}>
            <nav>
                <Link onClick={closeMenu} to="/dashboard">
                    <HomeIcon activePage={activePage} />
                </Link>
            </nav>

                <Link className="header-icon" onClick={closeMenu} to="/">
                    <LogoIconSmall />
                </Link>

            <div className="burger-button" onClick={() => setIsOpen(!isOpen)}>
                <HamburgerSqueeze barColor="white" isActive={isOpen} buttonWidth={40} />
            </div>
            <VegBurg closeMenu={closeMenu} isOpen={isOpen} setIsOpen={setIsOpen} />
            { playing || droning ? (
                <div className="header-alert">
                    {activeSession && <Link onClick={closeMenu} to="/form">Current practice session</Link>}
                    {playing && <Link onClick={closeMenu} to="./metdrone">{tempo} BPM {timeSig}/4</Link>}
                    {droning && <Link onClick={closeMenu} to="./metdrone">{root} {chordType}</Link>}
                </div>
            ) :
            <></>
            }
        </header>
    )
}