import { RecordIcon } from "../icons/RecordIcon";
import { MetDroneIcon } from "../icons/MetDroneIcon";
import { ForkIcon } from "../icons/ForkIcon";
import { Link } from 'react-router-dom'

export const Footer = ({ closeMenu, activePage, setActivePage }) => {
    const styles = {
        footer: {
            backgroundColor: "#101110",
            color: "#fff",
            position: "fixed",
            width: "100%",
            bottom: 0,
            left: 0,
            height: "7.2em",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            zIndex: 1000,
        },
        footerIcon: {
            width: "4em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }
    };
    return (
        <footer style={styles.footer}>
            <div style={styles.footerIcon}>
                <Link onClick={closeMenu} to="record">
                    <RecordIcon activePage={activePage} />
                </Link>
            </div>
            <div style={styles.footerIcon}>
                <Link onClick={closeMenu} to="metdrone">
                    <MetDroneIcon activePage={activePage} />
                </Link>
            </div>
            <div style={styles.footerIcon}>
                <Link onClick={closeMenu} to="fork">
                    <ForkIcon activePage={activePage} />
                </Link>
            </div>
        </footer>
    )
}
