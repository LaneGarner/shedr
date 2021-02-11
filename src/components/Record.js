import { RecordIcon } from "../icons/RecordIcon";

export const Record = ({setActivePage}) => {
    setActivePage("record")

    const styles = {
        recordContainer: {
            paddingTop: "10em",
            // backgroundColor: "#333",
            // height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // color: "white",
        },
    };
    return (
        <div style={styles.recordContainer}>
            <RecordIcon />
            <h1>Record</h1>
            <p>Looper and audio/video recording coming soon...</p>
            {/* <h2>My recordings</h2>
            <h2>Audio</h2>
            <h2>Video</h2>
            <h2>Looper</h2> */}
        </div>
    )
}