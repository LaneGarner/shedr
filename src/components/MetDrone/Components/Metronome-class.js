import React, { Component } from 'react';
import './Metronome.css';
import click1 from '../click1.flac';
import click2 from '../click2.wav';
import * as Tone from 'tone'
import { TimeSigSelect } from "./TimeSigSelect";

class Metronome extends Component {
    constructor(props) {
    super(props);

    this.state = {
        playing: false,
        bpm: 120,
        timeSig: 4,
        subdivision: '',
        // tick: true,
        position: '0:0:0',
    };
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    }

    // handleBpmChange = event => {
    //     const bpm = event.target.value;
    //     this.setState({ bpm });
    // }

    // timerWorker = new Worker("./metronomeworker.js");

    handleBpmChange = event => {
        const bpm = event.target.value;
        
        if(this.state.playing) {
            // Stop the old timer and start a new one
            Tone.Transport.cancel();
            // this.timer = setInterval(this.playClick);
            this.setState({
                bpm: bpm,
                // playing: true
                // Play a click "immediately" (after setState finishes)
            }, this.playClick)
        } else {
            // Otherwise just update the BPM
            this.setState({ bpm });
        }
        }

    handleTimeChange = event => {
        const timeSig = event.target.value;
        console.log(timeSig)
        
        if(this.state.playing) {
            // Stop the old timer and start a new one
            Tone.Transport.cancel();
            // this.timer = setInterval(this.playClick);
            this.setState({
                timeSig: timeSig,
                // playing: true
                // Play a click "immediately" (after setState finishes)
            }, this.playClick)
        } else {
            // Otherwise just update the BPM
            this.setState({ timeSig });
        }
        }

    // startStop = () => {
    //     this.click1.play();
    // }

    // startStop = () => {
    //     if(this.state.playing) {
    //     // Stop the timer
    //     clearInterval(this.timer);
    //     this.setState({
    //         playing: false
    //     });
    //     } else {
    //     // Start a timer with the current BPM
    //     this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
    //     this.setState({
    //         count: 0,
    //         playing: true
    //         // Play a click "immediately" (after setState finishes)
    //     }, this.playClick);
    //     }
    // }

    startStop = () => {
        const { count } = this.state;
        console.log(this.osc)


        if(!this.state.playing) {
            this.setState({
                count: 0,
                playing: true
                // Play a click "immediately" (after setState finishes)
            }, this.playClick)
            // Stop the timer
            
        } else {
            



            Tone.Transport.cancel();
            Tone.Transport.stop();

            this.setState({
                playing: false
            });

        }
    }

    playClick = () => {
        const { position, playing, count, timeSig } = this.state;
        const bpmNum = parseInt(this.state.bpm);
        const timeSig = parseInt(this.state.time);
        // var filt = new Tone.Filter().toMaster();
        const osc = new Tone.Oscillator().toDestination();
            
        const shift = new Tone.FrequencyShifter(420).toDestination();
        
        Tone.Transport.bpm.value = bpmNum;
        Tone.Transport.timeSignature = timeSig;

        
        const loop = new Tone.Loop((time) => {
            osc.start(time).stop(time + 0.1);
            // osc.type = "sine2"
            console.log(Tone.Transport.position.split(':')[1]);
            // {parseInt(Tone.Transport.position.split(':')[1]) === 0 ? osc.connect(shift) : osc.disconnect(shift)}
            this.setState({
                position: Tone.Transport.position
            });
            
        }, "4n").start(0);
        Tone.Transport.start();
        
        // {parseInt(position.split(':')[1]) == 3 ? osc.connect(shift) : osc.disconnect(shift)}
        
        
        
        
        
            // Tone.Transport.timeSignature = 5;
            // Tone.Transport.scheduleRepeat((time) => {
            //     // use the callback time to schedule events
            //     osc.start(time).stop(time + 0.1);
            // }, "4n");
            // // transport must be started before it starts invoking events
            // Tone.Transport.start();






            // Tone.Transport.stop()
    
        // The first beat will have a different sound than the others
        // if(count % time === 0) {
        // this.click2.play();
        // } else {
        // this.click1.play();
        // }
    
        // Keep track of which beat we're on
        // this.setState(state => ({
        // count: (state.count + 1) % state.time
        // }));
    }

    render() {
    const { position, playing, bpm } = this.state;
    const newPosition = parseInt(position.split(':')[1])

    return (
        <div className="metronome">
        {/* <TimeSigSelect handleTimeChange={handleTimeChange} /> */}
        <div className="bpm-slider">
            <div>{bpm} BPM</div>
            <input
            className="Slider"
            type="range"
            min="01"
            max="500"
            value={bpm}
            onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.startStop}>
            {playing ? 'Stop' : 'Start'}
        </button>
        <button>Tap</button>
        {playing ? <h3 style={{"fontSize": "5em", "color":"#333"}}>{newPosition + 1}</h3> : <div></div>}
        
        </div>
    );
    }
}

export default Metronome;