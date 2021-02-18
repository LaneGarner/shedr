import { useState, useEffect, useRef } from 'react';
import './Metronome.css';
import * as Tone from 'tone'
// import { TimeSigSelect } from "./TimeSigSelect";
// import { Accent } from "./Accent"
import click1Sample from '../click1.flac';
// import click2Sample from '../click2.wav';
import click3Sample from '../click3.wav';
import StartAudioContext from 'startaudiocontext'

const click1 = new Tone.Player(click1Sample).toDestination()
// const click2 = new Tone.Player(click2Sample).toDestination()
const click3 = new Tone.Player(click3Sample).toDestination()

const Metronome = ({ setClickVolume, clickVolume, tempo, setTempo, playing, setPlaying, timeSig, setTimeSig, setPosition, accent, setAccent }) => {    

    const [taps, setTaps] = useState([])

    const handleTapTempo = () => {
        if(!playing) {
            click3.start()
        }
        let time = Date.now()
        const newTaps = [...taps, time]
        if (newTaps.length === 3) {
            newTaps.shift()
        }
        console.log(newTaps)
        setTaps(newTaps)
    }

    useEffect(() => {
        if (taps.length > 1) {
            let newTaps = []

            taps.map((tap, i) => {
                const tapMath = 60000 / (taps[i] - taps[i - 1])
                newTaps.push(tapMath)
            })
            newTaps.shift()
            let avgBpm = newTaps = newTaps.reduce((a,b) => a + b, 0) / newTaps.length
            avgBpm = Math.round(avgBpm)
            setTempo(avgBpm)
        }
    }, [taps])
    
    


    const handleClickVolume = (e) => {
        setClickVolume(e.target.value)
    }

    const gainToDecibels = (value) => {
        if (value == null) return 0
        return 20 * (0.43429 * Math.log(value))
    }

    useEffect(() => {
        click1.volume.value = gainToDecibels(clickVolume)
        // click3.volume.value = gainToDecibels(clickVolume)
        console.log(click1.volume.value)
    }, [clickVolume])

    useEffect(() => {
        // click1.volume.value = gainToDecibels(clickVolume)
        click3.volume.value = gainToDecibels(clickVolume)
        console.log(click3.volume.value)
    }, [clickVolume])


    const handleAccent = () => {
        if (playing) {
            stopClick()
            setAccent(!accent)
            playClick()
        } else {
            setAccent(!accent)
        }
    }

    const handleTimeSig = (e) => {
        setTimeSig(parseInt(e.target.value))
        if (playing) {
            stopClick()
            playClick()
        }
    }
    
    const handleTempo = (e) => {
        setTempo(e.target.value)
        if (playing) {
            stopClick()
            playClick()
        }
    }
    
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
        const bpmNum = parseInt(tempo);
        
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
            // console.log(Tone.Transport.position)
        }, "4n");
        
        Tone.Transport.start();
    }

    const stopClick = () => {
        Tone.Transport.stop();
        Tone.Transport.cancel();
        Tone.Transport.position = "0:0:0"
    }

    const newPosition = parseInt(Tone.Transport.position.split(':')[1])


    const didMountRef = useRef(false)

    // useEffect(() => {
    //     if (didMountRef.current) {
    //         if (playing) {
    //             stopClick()
    //             playClick()
    //         }
    //     } else didMountRef.current = true
    // }, [accent, timeSig, tempo])
    useEffect(() => {
        if (didMountRef.current) {
            if (playing) {
                stopClick()
                playClick()
            }
        } else didMountRef.current = true
    }, [accent, timeSig, tempo])

    return (
        <div className="metronome">
        {playing ? <h1 style={{color: "#5AC18E"}}>Met</h1> : <h1 style={{color: "white"}}>Met</h1>}
        <div>
            <input checked={accent} type="checkbox" id="checkbox" onChange={handleAccent} />
            <label htmlFor="Accent">Accent</label>
        </div>
        <div className="met-settings">
            <label className="time-sig-label" htmlFor="selectTimeSig">Time signature</label><br/>
            <select onChange={handleTimeSig} name="selectTimeSig" id="selectTimeSig" value={timeSig}>
                <option value="4">4/4</option>
                <option value="3">3/4</option>
                <option value="5">5/4</option>
                <option value="7">7/4</option>
            </select>
            <div className="bpm-slider">
                <label htmlFor="bpmSlider">Tempo</label>
                <div>{tempo} BPM</div>
                <input
                    id="bpmSlider"
                    className="Slider"
                    type="range"
                    min="01"
                    max="400"
                    value={tempo}
                    onChange={handleTempo} />
            </div>
            <div>
                <label htmlFor="volumeSlider">Volume</label><br/>
                <input 
                id="volumeSlider"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={clickVolume}
                onChange={handleClickVolume}
                />
            </div>
        </div>
        <button id="startStopBtn" onClick={startStop}>
            {playing ? 'Stop' : 'Start'}
        </button>
        <button onMouseDown={handleTapTempo}>Tap</button>
        {playing ? <h3 className="Count" style={{"fontSize": "6em", "color":"#FFF"}}>{newPosition + 1}</h3> : <div></div>}
        </div>
    )
}

export default Metronome;