import React, { useEffect } from 'react'
import './Drone.css'
import * as Tone from 'tone'
import StartAudioContext from 'startaudiocontext'
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { Chord, ChordType } from "@tonaljs/tonal";

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

// const [droneVolume, setDroneVolume] = useState(-10)
// const [root, setRoot] = useState("C")
// const [chordType, setChordType] = useState("minor ninth")

export const Drone = ({  droning, setDroning, droneVolume, setDroneVolume, root, setRoot, chordType, setChordType }) => {
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
    

    useEffect(() => {
        synth.volume.value = droneVolume
        console.log(synth.volume.value)
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
            <input 
                value={root} 
                onChange={handleRootChange}
                type="text" 
                placeholder="Enter root"/>
            <select value={chordType} onChange={handleChordTypeChange} name="selectDroneRoot" id="selectDroneRoot">
                {chordTypes.map((chord, id) => <option key={id} value={chord}>{chord}</option>)}
            </select>

            {!droning ? <button className="start-drone-btn" onClick={startDrone}>Start</button> : <button className="stop-drone-btn" onClick={() => setDroning(!droning)}>Stop</button> }
            
            
            <div>
                <VolumeDown />
                <input 
                    type="range"
                    min={-100}
                    max={0}
                    step="0.1"
                    value={droneVolume}
                    onChange={(e) => setDroneVolume(e.target.value)}
                />
                <VolumeUp />
            </div>
        </div>
    )
}
