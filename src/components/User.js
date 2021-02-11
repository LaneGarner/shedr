import { Link } from 'react-router-dom'
import { LogIcon } from "../icons/LogIcon";
import { PaperClipIcon } from "../icons/PaperClipIcon";
import { PieChartIcon } from "../icons/PieChartIcon";
import "./User.css"

export const User = ({ user, logs, setActivePage }) => {
    setActivePage("user")
    // {user && console.log(user)}

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
            {user && (
                <>
                    {user.photoURL && <img src={user.photoURL} alt="user image" className="user-thumbnail"/> }
                    <h1>{user.displayName}</h1>
                </> 
            )}
            <div className="userDashboard">
                <Link to="log">
                    <div className="user-dashboard-card">
                        <LogIcon />
                        <h2>Practice log</h2>
                    </div>
                </Link>
                <Link>
                    <div className="user-dashboard-card">
                        <PaperClipIcon />
                        <h2>Repertoire list</h2>
                    </div>
                </Link>
                <Link>
                    <div className="user-dashboard-card">
                        <PieChartIcon />
                        <h2>Practice stats</h2>
                    </div>
                </Link>
            </div>
        </div>
    )
}

