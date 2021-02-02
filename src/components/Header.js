import React from 'react'
import { HomeIcon } from "../icons/HomeIcon";
import { UserIcon } from "../icons/UserIcon";
import { VegBurgIcon } from "../icons/VegBurgIcon";

export const Header = () => {
    const styles = {
        header: {
            backgroundColor: "#333",
            color: "#fff"
        }
    };
    return (
        <header style={styles.header}>
            <HomeIcon />
            <UserIcon />
            <h1>shedr</h1>
            <VegBurgIcon />
        </header>
    )
}