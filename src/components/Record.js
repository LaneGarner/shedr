export const Record = () => {

    const styles = {
        recordContainer: {
            paddingTop: "10em",
            backgroundColor: "#333",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    };
    return (
        <div style={styles.recordContainer}>
            <h1>Record</h1>
            <h2>My recordings</h2>
            <h2>Audio</h2>
            <h2>Video</h2>
            <h2>Looper</h2>
        </div>
    )
}