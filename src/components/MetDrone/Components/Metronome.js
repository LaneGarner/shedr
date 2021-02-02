import { Component } from 'react';
import './Metronome.css';
import * as Tone from 'tone'
import { TimeSigSelect } from "./TimeSigSelect";
import { Accent } from "./Accent"
import click1 from '../click1.flac';
import click2 from '../click2.wav';
import click3 from '../click3.wav';
import StartAudioContext from 'startaudiocontext'

class Metronome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            bpm: 120,
            timeSig: 4,
            subdivision: "",
            position: "0:0:0",
            accent: false,
    };
    this.click1 = new Tone.Player(click1).toDestination()
    this.click2 = new Tone.Player(click2).toDestination()
    this.click3 = new Tone.Player(click3).toDestination()
    }

    handleBpmChange = event => {
        const bpm = event.target.value;
        Tone.Transport.cancel();
        Tone.Transport.stop();
        Tone.Transport.position = "0:0:0"
        
        if(this.state.playing) {
            this.setState({ bpm }, this.playClick)
            Tone.Transport.start()
        } else {
            this.setState({ bpm });
        }
    }

    handleTimeSigChange = e => {
        const newTimeSig = parseInt(e.target.value);
        const { playing } = this.state
        
        
        if(playing) {
            Tone.Transport.cancel();
            Tone.Transport.stop();
            Tone.Transport.position = "0:0:0"
            this.setState({
                playing: false
            })
            this.setState({
                playing: true,
                timeSig: newTimeSig,
            }, this.playClick)
            Tone.Transport.start()
        } else {
            this.setState({ timeSig: newTimeSig });
        }
    }

    handleAccentChange = (e) => {
        // const accent = e.target.value
        Tone.Transport.cancel();
        Tone.Transport.stop();
        Tone.Transport.position = 0

        if(this.state.playing) {
            this.setState({accent: !this.state.accent}, this.playClick)
            Tone.Transport.start()
        } else {
            this.setState({accent: !this.state.accent})
        }
    }
    
    startStop = () => {
        // const { time } = this.state;

        StartAudioContext(Tone.context)

        if(!this.state.playing) {
            this.setState({
                playing: true
            }, this.playClick)
        } else {
            Tone.Transport.cancel();
            Tone.Transport.stop();

            this.setState({
                playing: false
            });
        }
    }

    playClick = () => {
        const bpmNum = parseInt(this.state.bpm);
        const { timeSig } = this.state;
        // const osc = new Tone.Oscillator().toDestination();
        
        Tone.Transport.bpm.value = bpmNum;
        Tone.Transport.timeSignature = timeSig;        
        
        this.state.accent && (
        Tone.Transport.scheduleRepeat((time) => {
            this.click1.start(time)
        }, "1m")
        )        
        Tone.Transport.start();
        
        Tone.Transport.scheduleRepeat((time) => {
            this.setState({
                position: Tone.Transport.position
            });
            this.click3.start(time)
        }, "4n");

    }

    render() {
        const { playing, bpm } = this.state;
        const newPosition = parseInt(Tone.Transport.position.split(':')[1])

        return (
            <div className="metronome">
            <Accent handleAccentChange={this.handleAccentChange}/>
            <TimeSigSelect handleTimeSigChange={this.handleTimeSigChange} />
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
                onChange={this.handleBpmChange} />
            </div>
            <button id="startStopBtn" onClick={this.startStop}>
                {playing ? 'Stop' : 'Start'}
            </button>
            <button>Tap</button>
            {playing ? <h3 style={{"fontSize": "6em", "color":"#333"}}>{newPosition + 1}</h3> : <div></div>}
            
            </div>
        );
    }
}

export default Metronome;