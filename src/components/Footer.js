import { RecordIcon } from "../icons/RecordIcon";
import { MetDroneIcon } from "../icons/MetDroneIcon";
import { ForkIcon } from "../icons/ForkIcon";
import { Link } from 'react-router-dom'

export const Footer = () => {
    const styles = {
        footer: {
            backgroundColor: "#101110",
            color: "#fff",
            position: "fixed",
            width: "100%",
            bottom: 0,
            left: 0,
            height: "8em",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
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
                <Link to="/record">
                    <RecordIcon />
                </Link>
            </div>
            <div style={styles.footerIcon}>
                <Link to="/metdrone">
                    <MetDroneIcon />
                </Link>
            </div>
            <div style={styles.footerIcon}>
                <Link to="/fork">
                    <ForkIcon />
                </Link>
            </div>
        </footer>
    )
}
