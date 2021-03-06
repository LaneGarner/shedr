import { useEffect, useContext } from "react"
import { StoreContext } from "../Store"

import { Link } from "react-router-dom"

import "./About.scss"

export const About = () => {
    const { setActivePage } = useContext(StoreContext)
    
    useEffect(() => {
        setActivePage("none")
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <div className="about-container">
            <h1>About</h1>
            <p>Shedr was created by me, Lane Garner, as my capstone app for the Fullstack Web Development program at Austin Coding Academy. I built it for myself and my guitar students to help keep track of our practice sessions along with some useful tools.</p>
            <p>I built Shedr with <a href="https://reactjs.org/" target="_blank" rel="noreferrer">React</a>, <a href="https://nodejs.org" target="_blank" rel="noreferrer">Node.js</a>, <a href="https://sass-lang.com/" target="_blank" rel="noreferrer">SCSS</a>, and <a href="https://firebase.google.com/" target="_blank" rel="noreferrer">Firebase</a> along with some help from libraries and packages such as <a href="https://tonejs.github.io/" target="_blank" rel="noreferrer">Tone.js</a>, <a href="https://github.com/tonaljs/tonal" target="_blank" rel="noreferrer">Tonal.js</a>, <a href="https://www.npmjs.com/package/mic-recorder-to-mp3" target="_blank" rel="noreferrer">Microphone Recorder to Mp3</a>, <a href="https://momentjs.com/" target="_blank" rel="noreferrer">Moment.js</a>, <a href="https://p5js.org/" target="_blank" rel="noreferrer">p5.js</a>, and <a href="https://github.com/LaneGarner/shedr/blob/main/package.json" target="_blank" rel="noreferrer">more</a>.</p>
            <p>You can check out my source code on <a href="https://github.com/LaneGarner/shedr" >GitHub</a> and view some of my other development work at <a href="https://lanegarner.dev" target="_blank" rel="noreferrer">lanegarner.dev</a>. If you have any feedback or ideas for the app feel free to <Link to="/feedback" target="_blank" rel="noreferrer">reach out</Link>.</p>
        </div>
    )
}
