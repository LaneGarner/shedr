import Metronome from './Components/Metronome';
import { Drone } from './Components/Drone';


export const MetDrone = () => {

    const styles = {
        metDroneContainer: {
            paddingTop: "10em",
            backgroundColor: "#333",
            height: "80vh",
            // display: "flex",
            // // flexDirection: "column",
            // alignItems: "flex-start",
            // justifyItems: "center",
            // justifyContent: "space-around",
            // flexWrap: "wrap",
        },
        metDroneHeadline: {
            textAlign: "center",
            color: "#5AC18E",
        },
        // metDroneComponentContainer: {
        //     display: "flex",
        //     alignItems: "center",
        //     justifyContent: "center",
        //     justifyItems: "center",
        // }
        metDroneComponentContainer: {
            display: "flex",
            // flexDirection: "column",
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
                    <Metronome />
                    <Drone />
                </div>
            </div>
        // </div>
    )
}