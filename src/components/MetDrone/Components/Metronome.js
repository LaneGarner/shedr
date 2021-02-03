import { useState, useEffect } from 'react';
import './Metronome.css';
import * as Tone from 'tone'
import { TimeSigSelect } from "./TimeSigSelect";
import { Accent } from "./Accent"
import click1Sample from '../click1.flac';
import click2Sample from '../click2.wav';
import click3Sample from '../click3.wav';
import StartAudioContext from 'startaudiocontext'

const click1 = new Tone.Player(click1Sample).toDestination()
const click2 = new Tone.Player(click2Sample).toDestination()
const click3 = new Tone.Player(click3Sample).toDestination()

const Metronome = () => {
    const [ playing, setPlaying ] = useState (false);
    const [ bpm, setBpm ] = useState(120);
    const [ timeSig, setTimeSig ] = useState(4);
    const [ subdivision, setSubDivision ] = useState("");
    const [ position, setPosition ] = useState("0:0:0");
    const [ accent, setAccent ] = useState(false);


    // const handleBpmChange = e => {
    //     const newBpm = e.target.value;
    //     Tone.Transport.cancel();
    //     Tone.Transport.stop();
    //     Tone.Transport.position = "0:0:0"
        
    //     if(playing) {
    //         setBpm(newBpm)
    //         playClick()
    //         Tone.Transport.start()
    //     } else {
    //         setBpm(newBpm)
    //     }
    // }

    // const handleTimeSigChange = e => {
    //     const newTimeSig = parseInt(e.target.value);        
        
    //     if(playing) {
    //         // Tone.Transport.cancel();

    //         playClick()
    //     } else {
    //         setTimeSig(newTimeSig)
    //     }
    // }



    useEffect(() => {
        
        if (playing) {
            stopClick()
            playClick()
        } 

    }, [accent, timeSig, bpm])

    
    const startStop = () => {
        StartAudioContext(Tone.context)
        Tone.start()

        if(!playing) {
            setPlaying(true)
            playClick()
        } else {
            Tone.Transport.cancel();
            Tone.Transport.stop();
            setPlaying(false)
        }
    }

    const playClick = () => {
        const bpmNum = parseInt(bpm);
        
        Tone.Transport.bpm.value = bpmNum;
        Tone.Transport.timeSignature = timeSig;        
        
        accent && (
        Tone.Transport.scheduleRepeat((time) => {
            click1.start(time)
        }, "1m")
        )        
        
        Tone.Transport.scheduleRepeat((time) => {
            setPosition(Tone.Transport.position)
            click3.start(time)
            console.log(Tone.Transport.position)
        }, "4n");
        
        Tone.Transport.start();
    }

    const stopClick = () => {
        Tone.Transport.stop();
        Tone.Transport.cancel();
        Tone.Transport.position = "0:0:0"

    }


        const newPosition = parseInt(Tone.Transport.position.split(':')[1])

        return (
            <div className="metronome">
            {playing ? <h1 style={{color: "orange"}}>met</h1> : <h1 style={{color: "white"}}>met</h1>}
            <div>
                <input type="checkbox" id="checkbox" value="accent" onChange={() => setAccent(!accent)} />
                <label htmlFor="Accent">Accent</label>
            </div>
            <label htmlFor="selectTimeSig">Time signature</label>
            <select onChange={(e) => setTimeSig(parseInt(e.target.value))} name="selectTimeSig" id="selectTimeSig">
                <option value="4">4/4</option>
                <option value="3">3/4</option>
                <option value="5">5/4</option>
                <option value="7">7/4</option>
            </select>
            <div className="bpm-slider">
                <label htmlFor="bpmSlider">Tempo</label>
                <div>{bpm} BPM</div>
                <input
                    id="bpmSlider"
                    className="Slider"
                    type="range"
                    min="01"
                    max="500"
                    value={bpm}
                    onChange={(e) => setBpm(e.target.value)} />
            </div>
            <button id="startStopBtn" onClick={startStop}>
                {playing ? 'Stop' : 'Start'}
            </button>
            <button>Tap</button>
            {playing ? <h3 className="Count" style={{"fontSize": "6em", "color":"#FFF"}}>{newPosition + 1}</h3> : <div></div>}
            
            </div>
        );
    // }
}

export default Metronome;