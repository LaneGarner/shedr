import { useState, useEffect, useContext } from "react"
import { StoreContext } from "../Store"

import { pitchDetection } from "ml5"
import Sketch from "react-p5"
import StartAudioContext from "startaudiocontext"

import { ForkIcon } from "../icons/ForkIcon"

import "./Fork.scss"

export const Fork = () => {

    const { setActivePage } = useContext(StoreContext)
    const [ tunerOpen, setTunerOpen ] = useState(false)
    const [ freq, setFreq ] = useState(0)
    const [ tuningMode, setTuningMode ] = useState("chromatic")

    let audioContext, pitch, stream, notes

    let threshold = 1

    if (tuningMode === "chromatic") {        
        notes = [
            {
            note: 'B8',
            freq: 7902.133
            },
            {
            note: 'A#8/Bb8',
            freq: 7458.620
            },
            {
            note: 'A8',
            freq: 7040.000
            },
            {
            note: 'G#8/Ab8',
            freq: 6644.875
            },
            {
            note: 'G8',
            freq: 6271.927
            },
            {
            note: 'F#8/Gb8',
            freq: 5919.911
            },
            {
            note: 'F8',
            freq: 5587.652
            },
            {
            note: 'E8',
            freq: 5274.041
            },
            {
            note: 'D#8/Eb8',
            freq: 4978.032
            },
            {
            note: 'D8',
            freq: 4698.636
            },
            {
            note: 'C#8/Db8',
            freq: 4434.922
            },
            {
            note: 'C8',
            freq: 4186.009
            },
            {
            note: 'B7',
            freq: 3951.066
            },
            {
            note: 'A#7/Bb7',
            freq: 3729.310
            },
            {
            note: 'A7',
            freq: 3520.000
            },
            {
            note: 'G#7/Ab7',
            freq: 3322.438
            },
            {
            note: 'G7',
            freq: 3135.963
            },
            {
            note: 'F#7/Gb7',
            freq: 2959.955
            },
            {
            note: 'F7',
            freq: 2793.826
            },
            {
            note: 'E7',
            freq: 2637.020
            },
            {
            note: 'D#7/Eb7',
            freq: 2489.016
            },
            {
            note: 'D7',
            freq: 2349.318
            },
            {
            note: 'C#7/Db7',
            freq: 2217.461
            },
            {
            note: 'C7',
            freq: 2093.005
            },
            {
            note: 'B6',
            freq: 1975.533
            },
            {
            note: 'A#6/Bb6',
            freq: 1864.655
            },
            {
            note: 'A6',
            freq: 1760.000
            },
            {
            note: 'G#6/Ab6',
            freq: 1661.219
            },
            {
            note: 'G6',
            freq: 1567.982
            },
            {
            note: 'F#6/Gb6',
            freq: 1479.978
            },
            {
            note: 'F6',
            freq: 1396.913
            },
            {
            note: 'E6',
            freq: 1318.510
            },
            {
            note: 'D#6/Eb6',
            freq: 1244.508
            },
            {
            note: 'D6',
            freq: 1174.659
            },
            {
            note: 'C#6/Db6',
            freq: 1108.731
            },
            {
            note: 'C6',
            freq: 1046.502
            },
            {
            note: 'B5',
            freq: 987.7666
            },
            {
            note: 'A#5/Bb5',
            freq: 932.3275
            },
            {
            note: 'A5',
            freq: 880.0000
            },
            {
            note: 'G#5/Ab5',
            freq: 830.6094
            },
            {
            note: 'G5',
            freq: 783.9909
            },
            {
            note: 'F#5/Gb5',
            freq: 739.9888
            },
            {
            note: 'F5',
            freq: 698.4565
            },
            {
            note: 'E5',
            freq: 659.2551
            },
            {
            note: 'D#5/Eb5',
            freq: 622.2540
            },
            {
            note: 'D5',
            freq: 587.3295
            },
            {
            note: 'C#5/Db5',
            freq: 554.3653
            },
            {
            note: 'C5',
            freq: 523.2511
            },
            {
            note: 'B4',
            freq: 493.8833
            },
            {
            note: 'A#4/Bb4',
            freq: 466.1638
            },
            {
            note: 'A4',
            freq: 440
            },
            {
            note: 'G#4/Ab4',
            freq: 415.3047
            },
            {
            note: 'G4',
            freq: 391.9954
            },
            {
            note: 'F#4/Gb4',
            freq: 369.9944
            },
            {
            note: 'F4',
            freq: 349.2282
            },
            {
            note: 'E4',
            freq: 329.6276
            },
            {
            note: 'D#4/Eb4',
            freq: 311.1270
            },
            {
            note: 'D4',
            freq: 293.6648
            },
            {
            note: 'C#4/Db4',
            freq: 277.1826
            },
            {
            note: 'C4',
            freq: 261.6256
            },
            {
            note: 'B3',
            freq: 246.9417
            },
            {
            note: 'A#3/Bb3',
            freq: 233.0819
            },
            {
            note: 'A3',
            freq: 220.0000
            },
            {
            note: 'G#3/Ab3',
            freq: 207.6523
            },
            {
            note: 'G3',
            freq: 195.9977
            },
            {
            note: 'F#3/Gb3',
            freq: 184.9972
            },
            {
            note: 'F3',
            freq: 174.6141
            },
            {
            note: 'E3',
            freq: 164.8138
            },
            {
            note: 'D#3/Eb3',
            freq: 155.5635
            },
            {
            note: 'D3',
            freq: 146.8324
            },
            {
            note: 'C#3/Db3',
            freq: 138.5913
            },
            {
            note: 'C3',
            freq: 130.8128
            },
            {
            note: 'B2',
            freq: 123.4708
            },
            {
            note: 'A#2/Bb2',
            freq: 116.5409
            },
            {
            note: 'A2',
            freq: 110.0000
            },
            {
            note: 'G#2/Ab2',
            freq: 103.8262
            },
            {
            note: 'G2',
            freq: 97.99886
            },
            {
            note: 'F#2/Gb2',
            freq: 92.49861
            },
            {
            note: 'F2',
            freq: 87.30706
            },
            {
            note: 'E2',
            freq: 82.40689
            },
            {
            note: 'D#2/Eb2',
            freq: 77.78175
            },
            {
            note: 'D2',
            freq: 73.41619
            },
            {
            note: 'C#2/Db2',
            freq: 69.29566
            },
            {
            note: 'C2',
            freq: 65.40639
            },
            {
            note: 'B1',
            freq: 61.73541
            },
            {
            note: 'A#1/Bb1',
            freq: 58.27047
            },
            {
            note: 'A1',
            freq: 55.00000
            },
            {
            note: 'G#1/Ab1',
            freq: 51.91309
            },
            {
            note: 'G1',
            freq: 48.99943
            },
            {
            note: 'F#1/Gb1',
            freq: 46.24930
            },
            {
            note: 'F1',
            freq: 43.65353
            },
            {
            note: 'E1',
            freq: 41.20344
            },
            {
            note: 'D#1/Eb1',
            freq: 38.89087
            },
            {
            note: 'D1',
            freq: 36.70810
            },
            {
            note: 'C#1/Db1',
            freq: 34.64783
            },
            {
            note: 'C1',
            freq: 32.70320
            },
            {
            note: 'B0',
            freq: 30.86771
            },
            {
            note: 'A#0/Bb0',
            freq: 29.13524
            },
            {
            note: 'A0',
            freq: 27.50000
            },
            {
            note: 'G#0/Ab0',
            freq: 25.95654
            },
            {
            note: 'G0',
            freq: 24.49971
            },
            {
            note: 'F#0/Gb0',
            freq: 23.12465
            },
            {
            note: 'F0',
            freq: 21.82676
            },
            {
            note: 'E0',
            freq: 20.60172
            },
            {
            note: 'D#0/Eb0',
            freq: 19.44544
            },
            {
            note: 'D0',
            freq: 18.35405
            },
            {
            note: 'C#0/Db0',
            freq: 17.32391
            },
            {
            note: 'C0',
            freq: 16.35160
            }
        ]
    } else if (tuningMode === "uke") {
        notes = [
            {
                note: 'A4',
                freq: 440
            },
            {
                note: 'E4',
                freq: 329.6276
            },
            {
                note: 'C4',
                freq: 261.6256
            },
            {
                note: 'G4',
                freq: 391.9954
            },
        ]
    } else if (tuningMode === "guitar") {
        notes = [
            {
                note: 'E4',
                freq: 329.6276
            },
            {
                note: 'B3',
                freq: 246.9417
            },
            {
                note: 'G3',
                freq: 195.9977
            },
            {
                note: 'D3',
                freq: 146.8324
            },
            {
                note: 'A2',
                freq: 110.0000
            },
            {
                note: 'E2',
                freq: 82.40689
            },
        ]
    } else if (tuningMode === "bass") {
        notes = [
            {
                note: 'G2',
                freq: 195.9977
            },
            {
                note: 'D2',
                freq: 146.8324
            },
            {
                note: 'A1',
                freq: 110.0000
            },
            {
                note: 'E1',
                freq: 82.40689
            },
        ]
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setActivePage("fork")
    }, [])


    const setup = (p5, canvasParentRef) => {
		p5.createCanvas(400, 400).parent(canvasParentRef)
	}

    const draw = (p5) => {

        p5.background(51);
        p5.textAlign(p5.CENTER, p5.CENTER)
        p5.fill(255)
        p5.textSize(32)
        p5.text(freq.toFixed(2), p5.width / 2, p5.height - 150);

        let closestNote = -1
        let recordDiff = Infinity
        for (let i = 0; i < notes.length; i++) {
            let diff = freq - notes[i].freq
            if (p5.abs(diff) < p5.abs(recordDiff)) {
            closestNote = notes[i]
            recordDiff = diff
            }
        }

        p5.textSize(64)
        p5.text(closestNote.note, p5.width / 2, p5.height - 50)

        let diff = recordDiff

        let alpha = p5.map(p5.abs(diff), 0, 100, 255, 0)
        p5.rectMode(p5.CENTER)
        p5.fill(255, alpha)
        p5.stroke(255)
        p5.strokeWeight(1)
        if (p5.abs(diff) < threshold) {
            p5.fill(89, 193, 142)
        }
        p5.rect(200, 100, 200, 50)

        p5.stroke(255)
        p5.strokeWeight(4)
        p5.line(200, 0, 200, 200)

        p5.noStroke()
        p5.fill(255, 98, 71)
        if (p5.abs(diff) < threshold) {
            p5.fill(89, 193, 142)
        }
        p5.rect(200 + diff / .5 , 100, 10, 75)
	}

    const startTuner = () => {
        setTunerOpen(true)
        let AudioContext = window.AudioContext || window.webkitAudioContext
        audioContext = new AudioContext();
        
        const setup = async () => {
            StartAudioContext(audioContext)
            stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            startPitch(stream, audioContext)
        }

        setup();

        const startPitch = (stream, audioContext) => {
            pitch = pitchDetection('../../model', audioContext , stream, modelLoaded)
        }

        const modelLoaded = () => {
            getPitch()
        }

        const getPitch = () => {
            pitch.getPitch(function(err, frequency) {
                if (frequency) {
                    setFreq(frequency)
                    console.log(frequency)
                } 
                getPitch();
                // clearTimeout
            })
        }

    }

    return (
        <div className="fork-container">
            {!tunerOpen && <ForkIcon width="200" /> }
            <h1>Fork</h1>
            {!tunerOpen ? (
                <>
                    <label htmlFor="tuningMode">Tuning mode</label>
                    <select value={tuningMode} onChange={(e)=>setTuningMode(e.target.value)} name="tuningMode" id="tuningMode">
                        <option value="chromatic">Chromatic</option>
                        <option value="guitar">Guitar</option>
                        <option value="bass">Bass</option>
                        <option value="uke">Ukulele</option>
                    </select>
                    <div className="startBtn timerBtn" onClick={startTuner}>Tune</div>
                </>
                ) : (
                        <Sketch setup={setup} draw={draw} />
                )
            }
        </div>
    )
}
