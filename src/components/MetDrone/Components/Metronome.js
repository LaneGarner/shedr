import { useState, useEffect, useRef , useContext} from 'react';
import { StoreContext } from '../../../Store'

import * as Tone from 'tone'
import StartAudioContext from 'startaudiocontext'

import click1Sample from '../click1.flac';
import click2Sample from '../click2.wav';
import click3Sample from '../click3.wav';

import './Metronome.scss';

const click1 = new Tone.Player(click1Sample).toDestination()
//-------SAVE FOR POLYRHYTHM MODE!!!-------------
// const click2 = new Tone.Player(click2Sample).toDestination()
const click3 = new Tone.Player(click3Sample).toDestination()

const Metronome = () => {    
    const { tempo, setTempo, playing, setPlaying, timeSig, setTimeSig, setPosition, accent, setAccent, setClickVolume, clickVolume, polyrhythmMode, setPolyrhythmMode, polyrhythm, setPolyrhythm } = useContext(StoreContext)
    const [taps, setTaps] = useState([])
    
    //-------SAVE FOR POLYRHYTHM MODE!!!-------------
    const three = 0.6666666666666666666666666666666666666666666666666666667
    const five = 0.4
    const seven = 0.285714285714286
    
    const handleTapTempo = () => {
        if(!playing) {
            click3.start()
        }
        let time = Date.now()
        const newTaps = [...taps, time]
        if (newTaps.length === 3) {
            newTaps.shift()
        }
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
    }, [clickVolume])
    
    //-------SAVE FOR POLYRHYTHM MODE!!!-------------
    // useEffect(() => {
    //     click2.volume.value = gainToDecibels(clickVolume)
    // }, [clickVolume])
    
    useEffect(() => {
        click3.volume.value = gainToDecibels(clickVolume)
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
    
    const handleTempoInput = (e) => {
        if(e.target.value !== "") {
            setTempo(e.target.value)
        } else {
            stopClick()
            setPlaying(false)
            setTempo(e.target.value)
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
        if (tempo !== "") {
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
        }, "4n");
        
        //-------SAVE FOR POLYRHYTHM MODE!!!-------------
        // if(polyrhythmMode) {
        //     setTimeSig(4)
        //     Tone.Transport.scheduleRepeat((time) => {
        //         setPosition(Tone.Transport.position)
        //         click2.start(time)
        //     }, polyrhythm);
        // }

        Tone.Transport.start();

        }
    }
    
    const stopClick = () => {
        Tone.Transport.stop();
        Tone.Transport.cancel();
        Tone.Transport.position = "0:0:0"
    }
    
    const newPosition = parseInt(Tone.Transport.position.split(':')[1])
    
    const didMountRef = useRef(false)
    
    useEffect(() => {
        if (didMountRef.current) {
            if (playing) {
                stopClick()
                playClick()
            }
        } else didMountRef.current = true
    }, [accent, timeSig, tempo, polyrhythm, polyrhythmMode])
    
    return (
        <div className="metronome">
            {playing ? <h1 style={{color: "#5AC18E"}}>Met</h1> : <h1 style={{color: "white"}}>Met</h1>}
            <div>
                <input checked={accent} type="checkbox" id="accent" onChange={handleAccent} />
                <label htmlFor="accent" style={{fontWeight: 400}} >Accent</label>
            </div>
            {/* //-------SAVE FOR POLYRHYTHM MODE!!!------------- */}
            {/* <div>
                <input checked={polyrhythmMode} type="checkbox" id="poly" onChange={()=>setPolyrhythmMode(!polyrhythmMode)} />
                <label htmlFor="poly" style={{fontWeight: 400}} >Polyrhythm mode</label>
            </div> */}
            <div className="met-settings">
                {!polyrhythmMode ? (
                <>
                    <label htmlFor="selectTimeSig">Time signature</label><br/>
                    <select onChange={handleTimeSig} name="selectTimeSig" id="selectTimeSig" value={timeSig}>
                        <option value="4">4/4</option>
                        <option value="3">3/4</option>
                        <option value="5">5/4</option>
                        <option value="7">7/4</option>
                    </select>
                </>
                ) : (
                    <>
                        <label className="time-sig-label" htmlFor="selectPoly">Polyrhythm</label><br/>
                        <select onChange={(e)=>setPolyrhythm(e.target.value)} name="selectPoly" id="selectPoly" value={polyrhythm}>
                            {/* <option value="3:2">3:2</option> */}
                            <option value={three}>3:4</option>
                            <option value={five}>5:4</option>
                            <option value={seven}>7:4</option>
                            {/* <option value="7:8">7:8</option> */}
                        </select>
                    </>
                )}
                <div className="bpm-slider">
                    <label htmlFor="bpmSlider">Tempo</label>
                    <div><input style={{width: "2em", fontSize: "1.5em"}} type="text" value={tempo} onChange={handleTempoInput} /> BPM</div>
                    <input
                        id="bpmSlider"
                        type="range"
                        min="01"
                        max="400"
                        value={tempo}
                        onChange={handleTempo} 
                    />
                </div>
                <div className="bpm-slider">
                    <label htmlFor="volumeSlider">Volume</label><br/>
                    <div>{clickVolume != 1 ? Math.round(clickVolume * 10): 11}</div>
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

export default Metronome
