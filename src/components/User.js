import { Link } from 'react-router-dom'
import "./User.css"

export const User = ({ user, logs, setActivePage }) => {
    setActivePage("user")

    // const styles = {
    //     userContainer: {
    //         paddingTop: "10em",
    //         backgroundColor: "#333",
    //         height: "100vh",
    //         display: "flex",
    //         flexDirection: "column",
    //         // alignItems: "center",
    //         color: "white",
    //     },
    //     userDashboard: {
    //         display: "flex",
    //         justifyContent: "space-around"
    //     }
    // };
    return (
        <div className="userContainer">
            <h1>{user && user.displayName}</h1>
            <div className="userDashboard">
                <Link to="log">
                    <h2>Practice log</h2>
                </Link>
                <h2>Repertoire list</h2>
                <h2>Practice stats</h2>
            </div>
        </div>
    )
}

