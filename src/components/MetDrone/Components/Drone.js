import React, { useState, useEffect } from 'react'
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

export const Drone = ({ droning, setDroning, droneVolume, setDroneVolume, root, setRoot, chordType, setChordType }) => {
    // const [droning, setDroning] = useState(false)
    // const [droneVolume, setDroneVolume] = useState(-10)
    // const [root, setRoot] = useState("C")
    // const [chordType, setChordType] = useState("minor ninth")
    
    let myChord = Chord.getChord(chordType, `${root}4`, `${root}5`);
    const chordTypes = ChordType.names()


    // let chord = Chord.getChord("min9", "C4").notes;
    // let chord

    useEffect(() => {
        // const myChord = Chord.get(root + chordType);
            setDroning(false)
            myChord = Chord.getChord(chordType, `${root}4`, `${root}5`);
            // const myChord = Chord.getChord(chordType, `${root}4`, "C5");

        chord = myChord.notes
    }, [root, chordType])

    // const myRoot = `"${root}4"`
    // const myChord = Chord.get(root + chordType);
    // const myChord = Chord.getChord(chordType, `${root}4`, "C5");
    // const chord = myChord.notes
    
    const test = () => {
        const chordTypes = ChordType.names()
        // chordTypes.map(chord => console.log(chord))
        console.log(myChord)
        // console.log(`"${root}4"`)
    }
    
    // const filter = new Tone.Filter(2000, "lowpass")
    // const verb = new Tone.Reverb(1)
    // const wide = new Tone.StereoWidener()
    // synth.chain( filter, verb, wide, Tone.Destination)



    // const vlm = volume
    // const vol = new Tone.Volume({volume})
    // const vol = new Tone.Volume(-12).toDestination();

    // synth.chain( filter, verb, wide, vol, Tone.Destination)

    const startDrone = () => {
        StartAudioContext(Tone.context)
        setDroning(true)
        // synth.triggerAttack(chord)
    }

    // const stopDrone = () => {
    //     synth.triggerRelease(chord)
    //     // synth.releaseAll()
    //     setDroning(false)
    //     // console.log("stop")
    // }

    useEffect(() => {

        droning ? synth.triggerAttack(chord) : synth.releaseAll();
    }, [droning])
    

    useEffect(() => {
        // stopDrone()
        synth.volume.value = droneVolume
        console.log(synth.volume.value)
    }, [droneVolume])

    return (
        <div className="Drone">
            {/* <button onClick={test}>Test</button> */}
            <h1 style={{color: "white"}}>drone</h1>
            <input 
                value={root} 
                onChange={(e) => setRoot(e.target.value)}
                type="text" 
                placeholder="root"/>
            <select value={chordType} onChange={(e) => setChordType(e.target.value)} name="selectDroneRoot" id="selectDroneRoot">
                {chordTypes.map((chord, id) => <option key={id} value={chord}>{chord}</option>)}
                {/* <optgroup label="Triads">
                    <option value="min">min</option>
                    <option value="major">maj</option>
                    <option value="dim">dim</option>
                    <option value="aug">aug</option>{}
                </optgroup>
                <optgroup label="7th">
                    <option value="maj7">maj7</option>
                    <option value="7">7</option>
                    <option value="min7">min7</option>
                    <option value="min7b5">min7b5</option>
                    <option value="dim7">dim7</option>
                    <option value="min7#5">min7#5</option>
                </optgroup>
                <optgroup label="9th">
                    <option value="maj9">maj9</option>
                    <option value="9">9</option>
                    <option value="minor9">min9</option>
                </optgroup> */}
            </select>

            {/* {!droning ? <button onClick={() => setDroning(!droning)}>Start</button> : <button onClick={stopDrone}>Stop</button>} */}
            {!droning ? <button onClick={startDrone}>Start</button> : <button onClick={() => setDroning(!droning)}>Stop</button> }
            
            
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
