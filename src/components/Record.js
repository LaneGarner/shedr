import React, { useEffect, useContext } from "react";
import { StoreContext } from '../Store'
import { RecordIcon } from "../icons/RecordIcon";

export const Record = () => {
    const { setActivePage } = useContext(StoreContext)
    
    useEffect(() => {
        setActivePage("record")
    })

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const styles = {
        recordContainer: {
            paddingTop: "10em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    }

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