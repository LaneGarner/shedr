import { NavLink } from 'react-router-dom'
import { Logo } from "../icons/Logo";


export const Home = () => {

    const styles = {
        homeContainer: {
            paddingTop: "8em",
            paddingBottom: "8em",
            backgroundColor: "#333",
            // height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        button: {
            margin: "2em",
            backgroundColor: "orange",
            border: "none",
            borderRadius: "2em",
            padding: "1.5em",
            cursor: "pointer",
            textDecoration: "none",
            color: "#333",
        },
        homeSubtitle: {
            color: "white",
            marginBottom: 0,
            fontWeight: 100,

        }
    };
    return (
        <div style={styles.homeContainer}>
            <Logo height="20em"/>
            <h2 style={styles.homeSubtitle}>Musician's practice toolkit</h2>
            <NavLink 
                to="/form"
                style={styles.button}>
                New practice session
            </NavLink>
        </div>
    )
}

