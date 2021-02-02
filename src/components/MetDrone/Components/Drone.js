import React, { useState } from 'react'
import './Drone.css'
import * as Tone from 'tone'
import StartAudioContext from 'startaudiocontext'
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Grid from '@material-ui/core/Grid';


export const Drone = () => {


// const handleDrone = () => {
//     StartAudioContext(Tone.context)
//     const synth = new Tone.Synth();
//     const pDelay = new Tone.PingPongDelay();
//     synth.connect(pDelay);
//     pDelay.connect(Tone.Destination);
//     synth.triggerAttackRelease('C4', '2m')

//     console.log('hi')
// }

const handleDroneStart = () => {
    // const newValue = 
    StartAudioContext(Tone.context)
    // console.log(volume)
    playDrone(volume)
    if(!playing) {
        handlePlaying(true)
    } else {
        handlePlaying(false)
    }


}

const playDrone = (vol) => {
    const now = Tone.now()
    console.log(now)
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
    // const filter = new Tone.AutoFilter(4).start();
    const filter = new Tone.Filter(2000, "lowpass")
    const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5)
    const verb = new Tone.Reverb(1)
    const wide = new Tone.StereoWidener()

    synth.chain( filter, verb, wide, Tone.Destination)
    synth.volume.value = vol -100
    
    if(!playing) {
        synth.triggerAttack(["C3", "C4", "Eb4", "G4", "Bb4", "D4"], now)
    } else {
        synth.triggerRelease()
        console.log('stop')
    }
}

const [playing, handlePlaying] = useState(false);
const [volume, setVolume] = useState(100);

const handleVolChange = (e, newValue) => {
console.log(newValue)
setVolume(newValue);
// playDrone({newValue})
// synth.volume.value = {newValue}
};

    return (
        <div className="Drone">
            <button onClick={handleDroneStart}>Drone</button>
            <div style={{width: "15em"}}>
                <Grid container spacing={2}>
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <Slider volume={volume} onChange={handleVolChange} aria-labelledby="continuous-slider" />
                    </Grid>
                    <Grid item>
                        <VolumeUp />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
