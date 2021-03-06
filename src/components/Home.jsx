import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { StoreContext } from "../Store"

import { FlatGuitarist } from "../images/FlatGuitarist"
import { FlatFemaleGuitarist } from "../images/FlatFemaleGuitarist"
import { FlatDrummer } from "../images/FlatDrummer"
import { FlatPianist } from "../images/FlatPianist"

import "./Home.scss"

export const Home = () => {
    const { setActivePage } = useContext(StoreContext)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        setActivePage("none")
    }, [])

    return (
        <div className="home-container">
            <div className="home-container-section">
                <div>
                    <FlatGuitarist />
                </div>
                <div>
                    <h1>Welcome to Shedr</h1>
                    <p>Shedr is a musician's practice toolkit designed for desktop, tablet, and mobile so you can practice efficiently wherever you are.</p>
                    <Link to="/dashboard" className="button"> Get Started</Link>
                </div>
            </div>
            <div className="home-container-section">
                <div>
                    <h2>Everything you need in one place</h2>
                    <ul>
                        {/* <div>
                            <FlatFemaleGuitarist/>
                        </div> */}
                        <li><span>Practice Log</span> - Track and time your practice sessions</li>
                        <li><span>Repertoire List</span> - Build and review your repertoire</li>
                        <li><span>Practice Stats</span> - Stay motivated by analyzing your progress</li>
                        <li><span>MetDrone</span> - Practice with an accurate metronome and a harmonic drone</li>
                        {/* <li><span>Recordings</span> - Record your practice sessions to revisit later</li> */}
                        <li><span>Tuner</span> - Make sure your instrument is in tune for each practice session</li>
                    </ul>
                </div>
                <div>
                    <FlatDrummer/>
                </div>
            </div>
            <div className="home-container-section">
                <div>
                    <FlatFemaleGuitarist/>
                </div>
                <div>
                    <FlatPianist/>
                </div>
            </div>
        </div>
    )
}

