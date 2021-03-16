import React, { useContext } from 'react'
import { StoreContext } from '../Store'
import { RecordIcon } from "../icons/RecordIcon";
import { MetDroneIcon } from "../icons/MetDroneIcon";
import { ForkIcon } from "../icons/ForkIcon";
import { Link } from 'react-router-dom'
import "./Footer.scss";

export const Footer = () => {
    const { closeMenu, activePage, isRecording } = useContext(StoreContext)

    return (
        <footer>
            <div className="footer-icon">
                <Link onClick={closeMenu} to="record">
                    <RecordIcon width="27.181" height="40.772" isRecording={isRecording} activePage={activePage} />
                </Link>
            </div>
            <div className="footer-icon">
                <Link onClick={closeMenu} to="metdrone">
                    <MetDroneIcon activePage={activePage} />
                </Link>
            </div>
            <div className="footer-icon">
                <Link onClick={closeMenu} to="fork">
                    <ForkIcon activePage={activePage} />
                </Link>
            </div>
        </footer>
    )
}
