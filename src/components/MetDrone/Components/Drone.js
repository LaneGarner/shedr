import React, { useEffect, useContext } from "react"
import "./Drone.css"
import * as Tone from "tone"
import StartAudioContext from "startaudiocontext"
import { Chord, ChordType } from "@tonaljs/tonal";
import { StoreContext } from "../../../Store"

const synth = new Tone.PolySynth({
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 2,
        decay: 1,
        sustain: 1,
        release: 0.5,
    },
});
const filter = new Tone.Filter(2000, "lowpass")
const verb = new Tone.Reverb(1)
const wide = new Tone.StereoWidener()
synth.chain( filter, verb, wide, Tone.Destination)

let chord;

export const Drone = () => {
    
    const { droning, setDroning, droneVolume, setDroneVolume, root, setRoot, chordType, setChordType } = useContext(StoreContext)



    let myChord = Chord.getChord(chordType, `${root}4`, `${root}5`);
    const chordTypes = ChordType.names()
    chord = myChord.notes
    // useEffect(() => {
    //     setDroning(false)
    //     myChord = Chord.getChord(chordType, `${root}4`, `${root}5`);
    //     chord = myChord.notes
    // }, [root])
    
    const startDrone = () => {
        StartAudioContext(Tone.context)
        setDroning(true)
        synth.triggerAttack(chord)
    }
    
    useEffect(() => {
        !droning && synth.releaseAll();
    }, [droning])
    

    const gainToDecibels = (value) => {
        if (value == null) return 0
        return 20 * (0.43429 * Math.log(value))
    }

    
    useEffect(() => {
        synth.volume.value = gainToDecibels(droneVolume);
    }, [droneVolume])

    const handleChordTypeChange = (e) => {
        setChordType(e.target.value)
        setDroning(false)
        myChord = Chord.getChord(chordType, `${root}4`, `${root}5`);
        chord = myChord.notes
    }

    const handleRootChange = (e) => {
        setRoot(e.target.value)
        setDroning(false)
        myChord = Chord.getChord(chordType, `${root}4`, `${root}5`);
        chord = myChord.notes
    }
    
    return (
        <div className="Drone">
            {droning ? <h1 style={{color: "#5AC18E"}}>Drone</h1> : <h1 style={{color: "white"}}>Drone</h1>}
            <label htmlFor="droneRoot">Root</label><br/>
            <input 
                id="droneRoot"
                value={root} 
                onChange={handleRootChange}
                type="text" 
                placeholder="Enter root"/>
            <label htmlFor="droneChord">Chord type</label><br/>
            <select id="droneChord" value={chordType} onChange={handleChordTypeChange} name="selectDroneRoot" id="selectDroneRoot">
                {chordTypes.map((chord, id) => <option key={id} value={chord}>{chord}</option>)}
            </select>

            <div className="bpm-slider">
                <label htmlFor="droneVolumeSlider">Volume</label><br/>
                <div>{droneVolume != 1 ? Math.round(droneVolume * 10): 11}</div>
                <input 
                    id="droneVolumeSlider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={droneVolume}
                    onChange={(e) => setDroneVolume(e.target.value)}
                />
            </div>

            {!droning ? 
            <button className="start-drone-btn" onClick={startDrone}>Start</button> : 
            <button className="stop-drone-btn" onClick={() => setDroning(!droning)}>Stop</button> }
            
        </div>
    )
}