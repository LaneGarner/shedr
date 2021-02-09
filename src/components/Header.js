import { findByLabelText } from '@testing-library/react';
import React from 'react'
import { HomeIcon } from "../icons/HomeIcon";
import { UserIcon } from "../icons/UserIcon";
import { Link } from 'react-router-dom'
import { matchPath } from "react-router-dom";

import "./Header.css"

import { VegBurgIcon } from "../icons/VegBurgIcon";
import VegBurg from "./VegBurg"

export const Header = ({ login, logout, user, activePage, setActivePage, activeSession, tempo, playing, timeSig, droning, root, chordType }) => {

    return (
        <header>
            <nav>
                <Link to="/">
                    <HomeIcon activePage={activePage} />
                </Link>
                <Link to="user">
                    <UserIcon activePage={activePage} />
                </Link>

            </nav>
                {activeSession && <Link to="/form">Current practice session</Link>}
                {playing && <Link to="./metdrone">{tempo}BPM {timeSig}/4</Link>}
                {droning && <Link to="./metdrone">{root} {chordType}</Link>}
            <VegBurg login={login} logout={logout} user={user} />
        </header>
    )
}