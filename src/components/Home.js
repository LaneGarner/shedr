import { NavLink } from 'react-router-dom'
import { Logo } from "../icons/Logo";


export const Home = () => {
    const handleClick = () => {
        // alert('hi')
        // history.push('/form');
        
    }

    const styles = {
        homeContainer: {
            paddingTop: "8em",
            backgroundColor: "#333",
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        button: {
            margin: "4em",
            backgroundColor: "orange",
            border: "none",
            borderRadius: "2em",
            padding: "1.5em",
            cursor: "pointer",
            textDecoration: "none",
            color: "#333",
        },
    };
    return (
        <div style={styles.homeContainer}>
            <Logo height="20em"/>
            <NavLink 
                to="/form"
                style={styles.button}>
                New practice session
            </NavLink>
        </div>
    )
}

