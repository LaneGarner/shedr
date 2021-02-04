import Metronome from './Components/Metronome';
import { Drone } from './Components/Drone';

export const MetDrone = () => {

    const styles = {
        metDroneContainer: {
            paddingTop: "8em",
            backgroundColor: "#333",
            paddingBottom: "8em",
            minHeight: "70vh",

        },
        metDroneHeadline: {
            textAlign: "center",
            color: "#5AC18E",
            paddingBottom: "1em",
        },
        metDroneComponentContainer: {
            display: "flex",
            alignItems: "flex-start",
            justifyItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
        }
    };
    return (
        // <div>
            <div style={styles.metDroneContainer}>
            <h1 style={styles.metDroneHeadline}>MetDrone</h1>
                <div style={styles.metDroneComponentContainer}>
                    <div style={{padding: '3em'}}>
                        <Metronome />
                    </div>
                    <div style={{padding: '3em'}}>
                        <Drone /></div>
                </div>
            </div>
        // </div>
    )
}