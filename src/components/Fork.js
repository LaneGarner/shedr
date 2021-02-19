import React, { useEffect, useContext } from "react";
import { StoreContext } from '../Store'
import { ForkIcon } from "../icons/ForkIcon";

export const Fork = () => {
    const { activePage, setActivePage } = useContext(StoreContext)
    
    useEffect(() => {
        setActivePage("fork")
        window.scrollTo(0, 0);
    }, [])

    const styles = {
        forkContainer: {
            paddingTop: "10em",
            backgroundColor: "#333",
            // height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyItems: "center",
            color: "white",
        },
    }
    return (
        <div style={styles.forkContainer}>
            <ForkIcon />
            <h1>fork</h1>
            <p>Tuner coming soon...</p>
        </div>
    )
}