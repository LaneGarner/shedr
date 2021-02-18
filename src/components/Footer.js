import { RecordIcon } from "../icons/RecordIcon";
import { MetDroneIcon } from "../icons/MetDroneIcon";
import { ForkIcon } from "../icons/ForkIcon";
import { Link } from 'react-router-dom'
import "./Footer.css";

export const Footer = ({ closeMenu, activePage, setActivePage }) => {
    
    return (
        <footer>
            <div className="footer-icon">
                <Link onClick={closeMenu} to="record">
                    <RecordIcon activePage={activePage} />
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
