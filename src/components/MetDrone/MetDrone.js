import Metronome from './Components/Metronome';
import { Drone } from './Components/Drone';

export const MetDrone = ({ tempo, setTempo, playing, setPlaying, timeSig, setTimeSig, position, setPosition, accent, setAccent, droning, setDroning, droneVolume, setDroneVolume, root, setRoot, chordType, setChordType }) => {
    {droneVolume === undefined && setDroneVolume(-10)}

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
                        <Metronome tempo={tempo} setTempo={setTempo} playing={playing} setPlaying={setPlaying} timeSig={timeSig} setTimeSig={setTimeSig} position={position} setPosition={setPosition} accent={accent} setAccent={setAccent} />
                    </div>
                    <div style={{padding: '3em'}}>
                        <Drone droning={droning} setDroning={setDroning} droneVolume={droneVolume} setDroneVolume={setDroneVolume} root={root} setRoot={setRoot} chordType={chordType} setChordType={setChordType} />
                    </div>
                </div>
            </div>
        // </div>
    )
}