import Metronome from './Components/Metronome';
import { Drone } from './Components/Drone';


export const MetDrone = () => {

    const styles = {
        metDroneContainer: {
            paddingTop: "10em",
            backgroundColor: "#333",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    };
    return (
        <div style={styles.metDroneContainer}>
            <h1>MetDrone</h1>
            <Drone />
            <Metronome />
        </div>
    )
}