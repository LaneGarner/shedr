import { Logo } from "../icons/Logo";

export const User = () => {

    const styles = {
        userContainer: {
            paddingTop: "10em",
            backgroundColor: "#333",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    };
    return (
        <div style={styles.userContainer}>
            <h1>User</h1>
            <h2>Practice log</h2>
            <h2>Repertoire list</h2>
            <h2>Practice stats</h2>
        </div>
    )
}

