import { useEffect } from 'react'
import Metronome from './Components/Metronome';
import { Drone } from './Components/Drone';
import './MetDrone.css'

export const MetDrone = ({ polyrhythmMode, setPolyrhythmMode, polyrhythm, setPolyrhythm, setClickVolume, clickVolume, setActivePage, tempo, setTempo, playing, setPlaying, timeSig, setTimeSig, position, setPosition, accent, setAccent, droning, setDroning, droneVolume, setDroneVolume, root, setRoot, chordType, setChordType }) => {
    
    useEffect(() => {
        setActivePage("metdrone")
    })

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    if(droneVolume === undefined) {
        setDroneVolume(-10)
    }

    return (
            <div className="metDroneContainer">
                <div className="metDroneComponentContainer">
                    <div className="metdrone-container">
                        <Metronome polyrhythm={polyrhythm} setPolyrhythm={setPolyrhythm} polyrhythmMode={polyrhythmMode} setPolyrhythmMode={setPolyrhythmMode} setClickVolume={setClickVolume} clickVolume={clickVolume} tempo={tempo} setTempo={setTempo} playing={playing} setPlaying={setPlaying} timeSig={timeSig} setTimeSig={setTimeSig} position={position} setPosition={setPosition} accent={accent} setAccent={setAccent} />
                    </div>
                    <div className="metdrone-container">
                        <Drone droning={droning} setDroning={setDroning} droneVolume={droneVolume} setDroneVolume={setDroneVolume} root={root} setRoot={setRoot} chordType={chordType} setChordType={setChordType} />
                    </div>
                </div>
            </div>
    )
}