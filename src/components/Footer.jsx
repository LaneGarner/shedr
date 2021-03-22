import { useContext } from "react"
import { StoreContext } from "../Store"
import { Link } from "react-router-dom"

import { RecordIcon } from "../icons/RecordIcon"
import { MetDroneIcon } from "../icons/MetDroneIcon"
import { ForkIcon } from "../icons/ForkIcon"

import "./Footer.scss"

export const Footer = () => {
    const { hover, setHover, closeMenu, activePage, isRecording } = useContext(StoreContext)

    return (
        <footer>
            <div className="footer-icon">
                <Link onMouseEnter={()=>setHover("record")} onMouseLeave={()=>setHover("none")} onClick={closeMenu} to="record">
                    <RecordIcon hover={hover} width="27.181" height="40.772" isRecording={isRecording} activePage={activePage} />
                </Link>
            </div>
            <div className="footer-icon">
                <Link onMouseEnter={()=>setHover("metdrone")} onMouseLeave={()=>setHover("none")} onClick={closeMenu} to="metdrone">
                    <MetDroneIcon hover={hover} activePage={activePage} />
                </Link>
            </div>
            <div className="footer-icon">
                <Link onMouseEnter={()=>setHover("fork")} onMouseLeave={()=>setHover("none")} onClick={closeMenu} to="fork">
                    <ForkIcon hover={hover} width="44.587" activePage={activePage} />
                </Link>
            </div>
        </footer>
    )
}
