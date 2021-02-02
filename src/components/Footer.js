import { RecordIcon } from "../icons/RecordIcon";
import { MetDroneIcon } from "../icons/MetDroneIcon";
import { ForkIcon } from "../icons/ForkIcon";

export const Footer = () => {
    const styles = {
        footer: {
            backgroundColor: "#333",
            color: "#fff"
        }
    };
    return (
        <footer syle={styles.footer}>
            <RecordIcon />
            <MetDroneIcon />
            <ForkIcon />
        </footer>
    )
}
