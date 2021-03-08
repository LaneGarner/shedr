import { useContext } from 'react'
import { HomeIcon } from "../icons/HomeIcon";
import { UserIcon } from "../icons/UserIcon";
import { Link } from 'react-router-dom'
import { HamburgerSqueeze } from 'react-animated-burgers'
import { StoreContext } from '../Store'
import VegBurg from "./VegBurg"
import "./Header.css"
import { LogoIconSmall } from "../icons/LogoIconSmall";

export const Header = () => {

    const { activePage, tempo, playing, timeSig, droning, root, chordType, activeSession, isOpen, setIsOpen, closeMenu } = useContext(StoreContext)
    return (
        <header style={{zIndex: 1000}}>
            <nav>
                <Link onClick={closeMenu} to="/">
                    <HomeIcon activePage={activePage} />
                </Link>
                <Link onClick={closeMenu} to="user">
                    <UserIcon activePage={activePage} />
                </Link>
            </nav>

            <div className="header-icon">
                <LogoIconSmall />
            </div>

            <div className="burger-button" onClick={() => setIsOpen(!isOpen)}>
                <HamburgerSqueeze barColor="white" isActive={isOpen} buttonWidth={40} />
            </div>
            <VegBurg closeMenu={closeMenu} isOpen={isOpen} setIsOpen={setIsOpen} />
            { playing || droning ? (
                <div className="header-alert">
                    {activeSession && <Link onClick={closeMenu} to="/form">Current practice session</Link>}
                    {playing && <Link onClick={closeMenu} to="./metdrone">{tempo} BPM {timeSig}/4</Link>}
                    {droning && <Link onClick={closeMenu} to="./metdrone">{root} {chordType}</Link>}
                    {/* {user && user.photo} */}
                </div>
            ) :
            <></>
            }
        </header>
    )
}