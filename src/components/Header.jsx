import { useContext } from "react"
import { StoreContext } from "../Store"

import { HomeIcon } from "../icons/HomeIcon"
import { Link } from "react-router-dom"
import { HamburgerSqueeze } from "react-animated-burgers"
import { LogoIconSmall } from "../icons/LogoIconSmall"
import { LogIconHeader } from "../icons/LogIconHeader"
import { VegBurg } from "./VegBurg.jsx"

import "./Header.scss"

export const Header = () => {

    const { hover, setHover, activePage, tempo, playing, timeSig, droning, root, chordType, activeSession, isOpen, setIsOpen, closeMenu } = useContext(StoreContext)
    return (
        <>
        <header style={{zIndex: 1000}}>
            <nav>
                <Link aria-label="Dashboard" tooltip="Dashboard" onMouseEnter={()=>setHover("dashboard")} onMouseLeave={()=>setHover("none")} onClick={closeMenu} to="/dashboard">
                    <HomeIcon hover={hover} activePage={activePage} />
                </Link>
                {/* <Link aria-label="Practice Log" tooltip="Log" onMouseEnter={()=>setHover("log")} onMouseLeave={()=>setHover("none")} onClick={closeMenu} to="/log">
                    <LogIconHeader hover={hover} activePage={activePage} />
                </Link> */}
            </nav>

                <Link aria-label="Home" className="header-logo header-icon" onClick={closeMenu} to="/">
                    <LogoIconSmall />
                </Link>

            <div className="burger-button" onClick={() => setIsOpen(!isOpen)}>
                <HamburgerSqueeze barColor="white" isActive={isOpen} buttonWidth={40} />
            </div>
        </header>
            { playing || droning ? (
                <div className="header-alert">
                    {activeSession && <Link onClick={closeMenu} to="/form">Current practice session</Link>}
                    {playing && <Link onClick={closeMenu} to="./metdrone">{tempo} BPM {timeSig}/4</Link>}
                    {droning && <Link onClick={closeMenu} to="./metdrone">{root} {chordType}</Link>}
                </div>
            ) :
            <></>
        }
        <VegBurg style={{zIndex: 999}} closeMenu={closeMenu} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
