import React, { useState } from 'react'
import * as Tone from 'tone'
import { Note, Interval, Distance, Scale, Chord } from "@tonaljs/tonal";
// import * as p5 from "p5";



export const Test = () => {
    const [playing, setPlaying] = useState(false)

    let loop;
    let drumLoop;
    let hatsLoop;
    let snareLoop;
    let hats;
    let synth;
    let drum;
    let noise;
    // let scale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', ]
    let scale;
    let random = Math.floor(Math.random() * 8 + 1)
    const play = (e) => {
        setPlaying(!playing)



        const lowPass = new Tone.Filter({
			frequency: 11000,
		}).toDestination();

		noise = new Tone.NoiseSynth({
			volume: -12,
			noise: {
				type: 'pink',
				playbackRate: 3,
			},
			envelope: {
				attack: 0.001,
				decay: 0.13,
				sustain: 0,
				release: 0.03,
			},
		}).connect(lowPass, Tone.Destination);

        
        
        Tone.Transport.start()
        console.log(Chord)
        
        scale = Scale.get("C4 minor pentatonic").notes;
        
        synth = new Tone.Synth()
        synth.connect(Tone.Destination)

        drum = new Tone.MembraneSynth().toDestination();
        hats = new Tone.MetalSynth();
        const filter = new Tone.Filter(1, "lowpass").toDestination();
        hats.volume.value = -30
        hats.connect(lowPass, Tone.Destination)

        loop = new Tone.Loop(loopStep, "8n");
        drumLoop = new Tone.Loop(drumLoopStep, "4n");
        hatsLoop = new Tone.Loop(hatsLoopStep, "8n")
        snareLoop = new Tone.Loop(snareLoopStep, "1n")




    if (!playing) {
        loop.start();
        drumLoop.start()
        hatsLoop.start()
        snareLoop.start()
    } else {
        loop.stop()
        drumLoop.stop()
        hatsLoop.stop()
        snareLoop.stop()
        }
    }
    
    const loopStep = (time) => {
            // console.log(p5.random(80, 100))
        // let note = Math.floor(Math.random() * ((880-110)+1) + 2);
        let note = scale[Math.floor(Math.random() * 8 )]
        // let n = p5.noise(p5.frameCount * 0.1)
        // let i = p5.floor(p5.map(n, 0, 1, 0, scale.length))

        // let note = scale[i]

        synth.triggerAttackRelease(note, "8n", time)
        // drum.triggerAttackRelease("C2", "1n", time)
    }

    const drumLoopStep = (time) => {
        drum.triggerAttackRelease("F1", "1n", time)
        console.log("kick")
    }

    const hatsLoopStep = (time) => {
        hats.triggerAttackRelease("A1", "64n", time)
        console.log("hats")
    }

    const snareLoopStep = (time) => {
        noise.triggerAttack(time)
        console.log('snare')
    }
    
    
    
    return <button style={{fontSize: "40px", margin: "80px"}} onClick={play}>play</button>
}
