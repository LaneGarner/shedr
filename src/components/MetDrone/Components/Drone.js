import React, { useState, useEffect } from 'react'
import './Drone.css'
import * as Tone from 'tone'
import StartAudioContext from 'startaudiocontext'
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';


export const Drone = () => {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(50);

    const chord = ["C2", "C3", "C4", "Eb4", "G4", "Bb4", "D4"]

    const synth = new Tone.PolySynth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 3,
            decay: 2,
            sustain: 1,
            release: 1.5,
        },
    });
    const filter = new Tone.Filter(2000, "lowpass")
    const verb = new Tone.Reverb(1)
    const wide = new Tone.StereoWidener()

    synth.chain( filter, verb, wide, Tone.Destination)

    const handleDroneStart = () => {
        StartAudioContext(Tone.context)
        setPlaying(true)
    }

    const stopDrone = () => {
        synth.releaseAll()
        setPlaying(false)
        console.log("stop")
    }

    useEffect(() => {
        playing && synth.triggerAttack(chord)
    }, [playing])

    useEffect(() => {
        // synth.volume = volume
    }, [volume])

    return (
        <div className="Drone">
            <h1 style={{color: "white"}}>drone</h1>
            {!playing ? <button onClick={handleDroneStart}>Start</button> : <button onClick={stopDrone}>Stop</button>}
            <div>
                <VolumeDown />
                <input 
                    type="range"
                    volume={volume}
                    onChange={(e) => setVolume(e.target.value)}
                />
                <VolumeUp />
            </div>
        </div>
    )
}
