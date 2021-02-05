import React, { useState, useRef } from 'react'
import Timer from 'react-compound-timer'
import "./PracticeTimer.css";

export const PracticeTimer = () => {
    const [timerStarted, setTimerStart] = useState()
    const [timerRunning, setTimerRunning] = useState()
    const [timerPaused, setTimerPaused] = useState()
    const [practiceTime, setPracticeTime] = useState("0")

    const inputEl = useRef(null);

    const handleStart = () => {
        setTimerStart(true)
        setTimerRunning(!timerRunning)
    }

    const handlePause = () => {
        setTimerRunning(!timerRunning)
        setTimerPaused(!timerPaused)
    }

    const handleStop = () => {
        setTimerStart(false)
        setTimerRunning(false)
        // reset()
    }
    


    return (
        <Timer
            formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
                // initialTime={55000}
                startImmediately={false}
                onStart={handleStart}
                onResume={handlePause}
                onPause={handlePause}
                // onStop={handleStop}
                onReset={handleStop}
        >
            {({ start, resume, pause, stop, reset, timerState, getTimerState }) => (
                <>
                    <div className="timerDisplay" ref={inputEl}>
                    <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds /> 
                    </div>
                    
                    {/* <div>{timerState}</div> */}
                    <br />
                    <div>
                        {timerStarted ? <><button className="timerBtn stopBtn" onClick={() => {
                            window.confirm('Are you sure? This will end your session and add current practice time to your log')
                                {timerPaused && setTimerPaused(!timerPaused)}
                                // setPracticeTime(Timer)
                                console.log(inputEl.current.slice(0, 4))
                                handleStop()
                                stop()
                                reset()
                            
                            // if(window.confirm('Are you sure? This will end your session add current practice time to your log')) {
                            //     {timerPaused && setTimerPaused(!timerPaused)}
                            //     handleStop()
                            //     stop()
                            //     reset()
                            // }
                        }}>End session</button><br/></> : <><button className="timerBtn startBtn" onClick={start}>Start</button><br /></>}
                        
                        {timerRunning && <><button className="timerBtn pauseBtn" onClick={pause}>Pause</button><br /></>}
                        {/* <button onClick={start}>Start</button> */}
                        {/* <button onClick={pause}>Pause</button> */}
                        {timerPaused && <><button className="timerBtn startBtn" onClick={resume}>Resume</button><br /></>}
                        
                        {/* <button onClick={stop}>Stop</button> */}
                        {/* {timerStarted && <button className="timerBtn resetBtn" onClick={reset}>Reset</button>} */}
                        
                    </div>
                </>
            )}
        </Timer>

    )
}
