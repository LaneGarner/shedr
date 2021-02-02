import { Logo } from "../icons/Logo";

export const Home = () => {
    const handleClick = () => {
        alert('hi')
    }

    const styles = {
        homeContainer: {
            paddingTop: "10em",
            backgroundColor: "#333",
            height: "100vh",
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
        },
    };
    return (
        <div style={styles.homeContainer}>
            <Logo height="20em"/>
            <button 
                onClick={handleClick}
                style={styles.button}>
                New practice session
            </button>
        </div>
    )
}

