import { findByLabelText } from '@testing-library/react';
import React from 'react'
import { HomeIcon } from "../icons/HomeIcon";
import { UserIcon } from "../icons/UserIcon";
import { Link } from 'react-router-dom'

import { VegBurgIcon } from "../icons/VegBurgIcon";
import VegBurg from "./VegBurg"

export const Header = ({ tempo, playing, timeSig, droning, root, chordType }) => {

    const styles = {
        header: {
            backgroundColor: "#272727",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "1em",
            paddingBottom: "1em",
            paddingLeft: "2em",
            paddingRight: "2em",
            height: "4em",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
        },
        nav: {
            display: "flex",
            justifyContent: "space-around",
            maxWidth: "20em",
            minWidth: "8em",
            // marginRight: "10em",
        },
    };
    return (
        <header style={styles.header}>
            <nav style={styles.nav}>
                    <Link to="/">
                        <HomeIcon fill={"orange"} />
                    </Link>
                    <Link to="/user">
                        <UserIcon />
                    </Link>
                    {/* <div>{tempo}</div> */}
            </nav>
                    {playing && <div>{tempo}BPM {timeSig}/4</div>}
                    {droning && <div>{root} {chordType}</div>}
            <VegBurg />
        </header>
    )
}